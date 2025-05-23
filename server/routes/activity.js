const express = require('express');
const pool = require('../db');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); // your JWT middleware

// Get activity for a date
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const date = req.query.date;

  if (!date) return res.status(400).json({ error: 'Date query parameter required' });

  try {
    const result = await pool.query(
      'SELECT content FROM activities WHERE user_id = $1 AND activity_date = $2',
      [userId, date]
    );
    if (result.rows.length === 0) return res.json({ content: '' });
    res.json({ content: result.rows[0].content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Save (insert/update) activity
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { date, content } = req.body;

  if (!date) return res.status(400).json({ error: 'Date is required' });

  try {
    // Upsert activity for user and date
    await pool.query(
      `INSERT INTO activities (user_id, activity_date, content)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, activity_date)
       DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()`,
      [userId, date, content]
    );
    res.json({ message: 'Activity saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
