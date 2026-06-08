/**
 * 自定义食物 API
 */
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/foods/custom — 获取所有自定义食物
router.get('/custom', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM custom_foods ORDER BY created_at DESC');
    // 转换字段名与前端一致
    const foods = rows.map(r => ({
      id: String(r.id),
      name: r.name,
      category: r.category,
      calories: r.calories,
      protein: r.protein,
      carbs: r.carbs,
      fat: r.fat,
    }));
    res.json(foods);
  } catch (err) {
    console.error('GET /api/foods/custom error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/foods/custom — 添加自定义食物
router.post('/custom', async (req, res) => {
  try {
    const { name, category, calories, protein, carbs, fat } = req.body;

    // 检查重复
    const [existing] = await pool.query('SELECT id FROM custom_foods WHERE name = ?', [name]);
    if (existing.length > 0) {
      return res.status(409).json({ error: '食物名称已存在' });
    }

    const [result] = await pool.query(
      'INSERT INTO custom_foods (name, category, calories, protein, carbs, fat) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category, calories, protein, carbs, fat]
    );

    res.json({
      success: true,
      food: { id: String(result.insertId), name, category, calories, protein, carbs, fat },
    });
  } catch (err) {
    console.error('POST /api/foods/custom error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/foods/custom/:id — 删除自定义食物
router.delete('/custom/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM custom_foods WHERE id = ?', [parseInt(req.params.id)]);
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/foods/custom error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
