# MySQL 集成方案 — 混合架构

## Context
当前 App 的所有数据存储在浏览器 LocalStorage 中。用户希望食品记录数据持久化到本地 MySQL，同时保留手机端（GitHub Pages）的离线可用性。采用**混合方案**：API 优先 → LocalStorage 降级。

## 架构

```
手机浏览器 (GitHub Pages)
        ↓
   API 不可用？→ LocalStorage (降级,保留现有功能)
        
本机开发环境
        ↓
   前端 JS → Express API (:3001) → MySQL 8.0
```

**核心策略**: `storage.js` 改造为智能数据层，优先调 API，API 不可用时静默降级到 LocalStorage。前端 UI 代码 (`app.js`, `meal-log.js`) 基本不变。

## 新增/修改文件

```
recodes/
├── server/
│   ├── package.json      # 后端依赖 (express, mysql2, cors)
│   ├── index.js          # Express 入口 (端口 3001)
│   ├── db.js             # MySQL 连接池配置
│   ├── setup.sql         # 建库建表脚本
│   └── routes/
│       ├── profile.js    # 用户信息 API
│       ├── meals.js      # 饮食记录 API
│       └── foods.js      # 自定义食物 API
├── js/
│   ├── api-client.js     # 新增：API 客户端 (fetch 封装)
│   ├── storage.js        # 修改：API 优先 + LocalStorage 降级
│   ├── meal-log.js       # 微调：适配异步 load/save
│   └── app.js            # 微调：适配异步调用
```

## MySQL 数据库设计

**库名**: `bmr_app`

```sql
-- 用户信息 (单行记录，每次更新覆盖)
CREATE TABLE user_profile (
  id INT PRIMARY KEY DEFAULT 1,
  gender VARCHAR(10) NOT NULL,
  age INT NOT NULL,
  height FLOAT NOT NULL,
  weight FLOAT NOT NULL,
  activity_level VARCHAR(20) NOT NULL,
  deficit INT NOT NULL DEFAULT 500,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 饮食记录
CREATE TABLE meal_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  record_date DATE NOT NULL,
  meal_type ENUM('breakfast','lunch','dinner','snack') NOT NULL,
  food_name VARCHAR(100) NOT NULL,
  food_category VARCHAR(20),
  grams INT NOT NULL,
  calories INT NOT NULL,
  protein FLOAT NOT NULL,
  carbs FLOAT NOT NULL,
  fat FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_date (record_date)
);

-- 自定义食物
CREATE TABLE custom_foods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(20) NOT NULL,
  calories FLOAT NOT NULL,
  protein FLOAT NOT NULL,
  carbs FLOAT NOT NULL,
  fat FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API 设计

| Method | Endpoint | 说明 |
|--------|----------|------|
| GET | `/api/profile` | 获取用户信息 |
| POST | `/api/profile` | 保存/更新用户信息 |
| GET | `/api/meals/:date` | 获取指定日期饮食记录 |
| POST | `/api/meals/:date` | 添加一条饮食记录 |
| DELETE | `/api/meals/:date/:mealType/:id` | 删除一条饮食记录 |
| GET | `/api/foods/custom` | 获取自定义食物列表 |
| POST | `/api/foods/custom` | 添加自定义食物 |
| DELETE | `/api/foods/custom/:id` | 删除自定义食物 |

## 数据流改造

### storage.js 改造思路
```
Storage.saveProfile(data)
  → apiClient.saveProfile(data)      // 试 API
    .catch(() => localStorage fallback) // API 挂了 → 用 LocalStorage

Storage.loadProfile()
  → apiClient.loadProfile()          // 试 API
    .catch(() => localStorage fallback) // API 挂了 → 用 LocalStorage
```

### 关键改动点
1. `storage.js` — 所有方法改为异步，API 优先
2. `meal-log.js` — `load/save/addFood/removeFood` 改为 async/await
3. `app.js` — 所有调用 `Storage` / `MealLog` 的地方加 await
4. 新增 `api-client.js` — 封装 fetch，统一处理 API 错误

## 实施步骤

### Step 1: 创建 MySQL 数据库和表
- 编写 `server/setup.sql`
- 执行建库建表

### Step 2: 创建后端服务
- `server/package.json` + `npm install`
- `server/db.js` — 连接池
- `server/routes/` — 三个路由模块
- `server/index.js` — Express 入口

### Step 3: 创建 API 客户端
- `js/api-client.js` — fetch 封装, BASE_URL = 'http://localhost:3001'

### Step 4: 改造数据层
- `storage.js` → 异步 + API 优先 + LocalStorage 降级
- `meal-log.js` → 适配异步

### Step 5: 适配 UI 层
- `app.js` → await 调用异步方法

### Step 6: 启动脚本
- 更新 `start.bat` / `start.sh` 加入后端启动

### Step 7: 验证
- 启动后端 → 打开前端 → 数据录入 → 查询 MySQL 确认落库
- 停掉后端 → 前端仍可用 (LocalStorage 降级)

## 验证方式
1. 执行 `server/setup.sql` 建库建表
2. `cd server && npm install && node index.js` 启动后端
3. 浏览器打开 `index.html`，填写用户信息
4. 添加饮食记录
5. `mysql> SELECT * FROM bmr_app.meal_records;` 验证数据落库
6. 停掉后端 → 刷新页面 → 数据仍在（从 LocalStorage 降级读取）
