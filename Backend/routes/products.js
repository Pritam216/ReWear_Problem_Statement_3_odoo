// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

// Get all products
router.get('/', (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get a specific product by ID
router.get('/:id', (req, res) => {
  const query = "SELECT * FROM products WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: 'Product not found' });
    res.json(results[0]);
  });
});

// Create a new product (requires authentication)
router.post('/', verifyToken, (req, res) => {
  const { name, description, price, category, available } = req.body;
  const query = "INSERT INTO products (name, description, price, category, available, seller_id) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [name, description, price, category, available, req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Product created', productId: results.insertId });
  });
});

// Update an existing product (must be the owner)
router.put('/:id', verifyToken, (req, res) => {
  const { name, description, price, category, available } = req.body;
  // Check product ownership
  const checkQuery = "SELECT * FROM products WHERE id = ? AND seller_id = ?";
  db.query(checkQuery, [req.params.id, req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(403).json({ message: 'Not authorized to update this product' });
    
    const updateQuery = "UPDATE products SET name=?, description=?, price=?, category=?, available=? WHERE id=?";
    db.query(updateQuery, [name, description, price, category, available, req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Product updated' });
    });
  });
});

// Delete a product (must be the owner)
router.delete('/:id', verifyToken, (req, res) => {
  // Check product ownership
  const checkQuery = "SELECT * FROM products WHERE id = ? AND seller_id = ?";
  db.query(checkQuery, [req.params.id, req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    
    const deleteQuery = "DELETE FROM products WHERE id = ?";
    db.query(deleteQuery, [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Product deleted' });
    });
  });
});

module.exports = router;
