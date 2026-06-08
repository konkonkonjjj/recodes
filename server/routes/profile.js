/**
 * 用户信息 API
 */
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/profile — 获取用户信息
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user_profile WHERE id = 1');
    if (rows.length === 0) {
      return res.json(null);
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('GET /api/profile error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/profile — 保存/更新用户信息
router.post('/', async (req, res) => {
  try {
    const { gender, age, height, weight, activityLevel, deficit } = req.body;
    await pool.query(
      `INSERT INTO user_profile (id, gender, age, height, weight, activity_level, deficit)
       VALUES (1, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         gender = VALUES(gender),
         age = VALUES(age),
         height = VALUES(height),
         weight = VALUES(weight),
         activity_level = VALUES(activity_level),
         deficit = VALUES(deficit)`,
      [gender, age, height, weight, activityLevel, deficit]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('POST /api/profile error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
