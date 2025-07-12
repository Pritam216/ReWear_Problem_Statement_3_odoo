// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if(!username || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  // Check for existing email
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserQuery, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0)
      return res.status(400).json({ message: 'Email already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = "INSERT INTO users (username, email, password,green_points_left) VALUES (?, ?, ?,20)";
    db.query(insertQuery, [username, email, hashedPassword], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Login a user
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if(!email || !password)
    return res.status(400).json({ message: 'Missing email or password' });
  
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(400).json({ message: 'User not found' });
    
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
      return res.status(401).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ 
      id: user.id,
      role: user.role,
      email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({ token });
  });
});

module.exports = router;
