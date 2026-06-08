# 🥗 减脂营养计划

纯前端减脂营养管理应用，支持**任意场合手机访问** + 添加到主屏幕。

---

## 🌐 方式一：GitHub Pages 部署（推荐 · 免费永久链接）

部署到 GitHub Pages 后获得公开 URL，任何地方都能用手机打开，无需同一 WiFi。

### 部署步骤

```bash
# 1. 在 GitHub 创建新仓库，例如: bmr-app

# 2. 推送代码（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/bmr-app.git
git branch -M main
git push -u origin main

# 3. 在 GitHub 仓库 → Settings → Pages
#    Source 选择 "Deploy from a branch" → main → / (root) → Save
```

等待 1-2 分钟后，访问 `https://你的用户名.github.io/bmr-app` 即可。

### 手机添加到主屏幕
- **Safari**: 打开链接 → 分享 → 「添加到主屏幕」
- **Chrome**: 打开链接 → 菜单 → 「添加到主屏幕」

> 添加后即可像原生 App 使用，支持离线打开！

---

## 📦 方式二：独立离线文件（无需网络 · 单文件）

`app-standalone.html` 是一个完全自包含的文件（CSS/JS 全部内联），可以：
- 发到微信 / 邮件 → 用手机浏览器打开
- 保存到手机文件 → 用浏览器打开
- AirDrop / 蓝牙传给手机

> ⚠️ 独立文件使用 `file://` 协议，LocalStorage 正常工作，但 PWA 安装功能需 HTTPS。

---

## 🏠 方式三：本地 WiFi 访问（同一网络）

双击 `start.bat`（Windows）或运行 `bash start.sh`（Mac/Linux），脚本会显示手机访问地址。

---

## 功能

- **身体数据录入** — 身高、体重、年龄、性别、活动水平
- **BMR/TDEE 计算** — Mifflin-St Jeor 公式
- **减脂目标热量** — TDEE - 可调缺口 (300-800 kcal，默认 500)
- **宏量营养素推荐** — 蛋白质 30% / 碳水 45% / 脂肪 25%
- **每餐分配建议** — 早餐 30% · 午餐 35% · 晚餐 25% · 加餐 10%
- **饮食记录** — 搜索食物库，记录每餐饮食及份量
- **每日概览** — 实时进度条：热量 + 三大营养素
- **剩余计算** — 还可摄入的热量、蛋白质、碳水、脂肪
- **食物库** — 74 种内置中国常见食物（7 大类）
- **自定义食物** — 手动录入任意食物的营养数据
- **数据持久化** — 浏览器 LocalStorage，刷新不丢失

## 技术栈

纯 HTML/CSS/JS · 零依赖 · PWA · 响应式

## 文件结构

```
recodes/
├── index.html            # 主页面 (4 Tab)
├── app-standalone.html   # 独立离线文件（CSS/JS 全部内联）
├── manifest.json         # PWA 配置
├── sw.js                 # Service Worker 离线缓存
├── icon-192/512.png      # App 图标
├── start.bat / start.sh  # 本地启动脚本
├── css/style.css         # 响应式样式
├── js/
│   ├── app.js            # 应用入口
│   ├── calculator.js     # BMR/TDEE/宏量计算
│   ├── food-db.js        # 74种食物知识库
│   ├── meal-log.js       # 饮食记录管理
│   └── storage.js        # LocalStorage 封装
└── README.md
```
