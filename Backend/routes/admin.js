// routes/admin.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Admin: Retrieve all users
router.get('/users', verifyToken, isAdmin, (req, res) => {
  const query = "SELECT id, username, email, role FROM users";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Admin: Delete a user by ID
router.delete('/users/:id', verifyToken, isAdmin, (req, res) => {
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User deleted' });
  });
});

// Admin: Retrieve all products
router.get('/products', verifyToken, isAdmin, (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.put('/make-admin/:id', verifyToken, isAdmin, (req, res) => {
  const userId = req.params.id;
  const query = "UPDATE users SET role = 'admin' WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User promoted to admin' });
  });
});


module.exports = router;
