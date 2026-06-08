/**
 * 减脂营养计划 — 后端 API 服务
 * Express + MySQL
 */
const express = require('express');
const cors = require('cors');
const path = require('path');

const profileRoutes = require('./routes/profile');
const mealsRoutes = require('./routes/meals');
const foodsRoutes = require('./routes/foods');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 静态文件服务（前端页面）
app.use(express.static(path.join(__dirname, '..')));

// API 路由
app.use('/api/profile', profileRoutes);
app.use('/api/meals', mealsRoutes);
app.use('/api/foods', foodsRoutes);

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  🥗 减脂营养计划 API 服务已启动`);
  console.log(`  📡 地址: http://localhost:${PORT}`);
  console.log(`  📝 API:  http://localhost:${PORT}/api\n`);
});
