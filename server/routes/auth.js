const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (userExists.rows.length > 0) return res.status(400).json({ error: 'Email already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    [name, email, hashedPassword]
  );

  res.status(201).json({ message: 'User created' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (user.rows.length === 0) return res.status(400).json({ error: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { name: user.rows[0].name, email: user.rows[0].email } });
});

module.exports = router;
