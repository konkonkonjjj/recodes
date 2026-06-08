# B站一起看 (Bilibili Watch Together) 实现计划

## Context
用户需要一个 B 站远程同步观看工具。选择方案：独立网页应用 + Node.js WebSocket 后端 + 同步播放 + 聊天。项目从零搭建，无现有代码。

## 关键架构决策

**不能用 iframe 嵌入 B 站播放器** —— B 站 `player.bilibili.com` 的 iframe 不支持 postMessage 编程控制，无法实现 pause/resume/seek 同步。替代方案：服务端调用 B站 HTTP API 获取 MP4 流地址，客户端用原生 `<video>` 标签播放，完全可控。

## 项目结构
```
E:\claude code 试验文件\bilibili-together\
├── package.json          # express, socket.io, axios
├── server.js             # 后端 (~400行): 房间管理 + Socket.IO + B站 API 代理
├── public/
│   ├── index.html        # 单页 HTML: 首页(创建/加入房间) + 房间页(播放器+聊天)
│   ├── style.css         # 暗色主题, Grid 布局, B站风格配色
│   └── app.js            # 前端逻辑 (~500行): 播放器控制 + 同步 + 聊天 + 状态机
```

## 数据流

```
Host 操作 → socket.emit → Server 更新房间状态 → io.to(room).emit → Guest 应用同步
```

- **Host** 拥有播放控件（播放/暂停/拖动进度条），所有操作实时广播
- **Guest** 接收 sync-command，应用到本地 `<video>`，每 5 秒做 drift 校正
- **Server** 是状态的中转站和真相源（在内存中维护房间 Map）

## Socket.IO 事件（核心）

### 客户端 → 服务端
- `create-room` / `join-room` — 房间管理
- `set-video` (host only) — 设置 BV 号，服务端抓取流地址
- `host-play` / `host-pause` / `host-seek` (host only) — 播放控制
- `send-message` — 聊天
- `request-sync` — 新加入者/重连获取当前状态

### 服务端 → 客户端
- `room-created` / `room-joined` / `join-error`
- `video-info` — 视频元数据和流地址
- `sync-command` — { action: play|pause|seek, currentTime, serverTime }
- `sync-state` — 完整状态（给新加入者）
- `new-message` — 聊天消息 + 系统消息
- `user-list-update` / `host-changed` / `room-closed`

## B站 API 代理（服务端）

### REST 端点
- `GET /api/video-info?bvid=BVxxx` — 调用 B站 view API，返回标题/时长/CID
- `GET /api/play-url?bvid=BVxxx&cid=123` — 调用 B站 playurl API (fnval=1)，返回 MP4 流 URL

### 策略
- 优先使用 legacy playurl 接口（无需 WBI 签名），若 403 则启用 WBI 签名
- 流 URL 120 分钟过期，在 `set-video` 和 `request-sync` 时检查刷新
- 服务端代理解决 CORS 和 Referer 限制

## 同步逻辑

### 延迟补偿
```javascript
// Guest 收到 sync-command 时
const latency = (Date.now() - serverTime) / 1000;
video.currentTime = currentTime + latency;
```

### Drift 校正（每 5 秒）
```javascript
const expected = expectedTime + (Date.now() - lastServerUpdate) / 1000;
if (Math.abs(expected - video.currentTime) > 1.0) {
  video.currentTime = expected; // 校正
}
```

### Host 去抖
Play/Pause/Seek 事件 300ms 防抖，避免事件风暴。

## UI 布局
```
┌─────────────────────────────────────────────┐
│  Top Bar: [房间号 1234] [在线 3人] [离开]    │
├──────────────────────┬──────────────────────┤
│  视频播放区          │  聊天面板             │
│  (原生 <video>)     │  ┌─────────────────┐ │
│                     │  │ 消息列表         │ │
│  [▶/⏸] [进度条]    │  │                 │ │
│  [时间显示]         │  │                 │ │
│  (Host 才有控件)    │  ├─────────────────┤ │
│                     │  │ [输入框] [发送]  │ │
│  [BV输入] [加载]    │  └─────────────────┘ │
│  (Host only)        │                      │
└──────────────────────┴──────────────────────┘
```

## 实现步骤

### Phase 1: 脚手架
1. 创建目录结构、`package.json`、安装依赖

### Phase 2: 服务端
2. Express + Socket.IO 基础框架
3. 房间管理（创建/加入/离开/断线/空房间清理）
4. B站 API 代理端点

### Phase 3: 客户端
5. `index.html` + `style.css`（首页 + 房间页 UI）
6. Socket.IO 连接 + 房间创建/加入流程
7. 视频播放器（Host 控件 + 事件发射）
8. 同步逻辑（Guest 接收 + 延迟补偿 + Drift 校正）
9. 聊天系统

### Phase 4: 边界处理
10. Host 断线转移 / Guest 断线清理 / 页面刷新自动重连
11. 无效 BV 号 / 无效房间号 / 重名处理
12. 加载态 / 错误态 / 流 URL 过期刷新

## 边界情况
| 情况 | 处理 |
|------|------|
| Host 断线 | 顺位下一个用户成为 Host，广播 host-changed |
| Guest 断线 | 从房间移除，更新用户列表 |
| 迟加入者 | 发送 sync-state（含当前进度和播放状态） |
| 页面刷新 | sessionStorage 存 name+roomCode，自动重连 |
| 流 URL 过期 | 服务端检查过期，重新请求 B站 API |
| 无效 BV 号 | 返回错误，前端 toast 提示 |
| 空房间 | 最后一人离开时删除房间 |
| Guest 不同步 | 5 秒一次 drift 检测，偏差 >1s 自动校正 |
| 重复控制事件 | Host 端 300ms 防抖 |
| 非 Host 发送控制 | 服务端校验 socket.id !== room.hostId，忽略 |

## 验证方法
```bash
cd bilibili-together && npm start
# 开 3 个浏览器 Tab 测试:
# Tab A: 创建房间 → 设置视频 → 播放
# Tab B: 加入房间 → 观察同步 → 发送聊天
# Tab C: 加入房间 → 验证迟加入同步
# 关闭 Tab A → 验证 Tab B 是否自动成为 Host
```
