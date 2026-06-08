/**
 * 饮食记录 API
 */
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/meals/:date — 获取指定日期所有饮食记录
router.get('/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM meal_records WHERE record_date = ? ORDER BY created_at ASC',
      [date]
    );

    // 按餐次分组，保持与前端一致的格式
    const meals = { breakfast: [], lunch: [], dinner: [], snack: [] };
    for (const row of rows) {
      const entry = {
        id: String(row.id),
        foodName: row.food_name,
        foodCategory: row.food_category,
        grams: row.grams,
        nutrition: {
          calories: row.calories,
          protein: row.protein,
          carbs: row.carbs,
          fat: row.fat,
        },
      };
      if (meals[row.meal_type]) {
        meals[row.meal_type].push(entry);
      }
    }

    res.json({ meals });
  } catch (err) {
    console.error('GET /api/meals error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/meals/:date — 添加一条饮食记录
router.post('/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const { mealType, foodName, foodCategory, grams, nutrition } = req.body;

    const [result] = await pool.query(
      `INSERT INTO meal_records (record_date, meal_type, food_name, food_category, grams, calories, protein, carbs, fat)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [date, mealType, foodName, foodCategory || '', grams, nutrition.calories, nutrition.protein, nutrition.carbs, nutrition.fat]
    );

    res.json({
      success: true,
      entry: {
        id: String(result.insertId),
        foodName,
        foodCategory,
        grams,
        nutrition,
      },
    });
  } catch (err) {
    console.error('POST /api/meals error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/meals/:date/:mealType/:id — 删除一条饮食记录
router.delete('/:date/:mealType/:id', async (req, res) => {
  try {
    const { date, mealType, id } = req.params;
    await pool.query(
      'DELETE FROM meal_records WHERE record_date = ? AND meal_type = ? AND id = ?',
      [date, mealType, parseInt(id)]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/meals error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
