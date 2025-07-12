// routes/dashboard.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

// Retrieve user-specific data (listed products and purchases)
router.get('/', verifyToken, (req, res) => {
  // Products listed by the current user
  const userProductsQuery = "SELECT * FROM products WHERE seller_id = ?";
  db.query(userProductsQuery, [req.user.id], (err, productResults) => {
    if (err) return res.status(500).json({ error: err });
    
    // Retrieve purchases (if applicable, assuming you have a purchases table)
    const purchasesQuery = `
      SELECT p.*, pr.name, pr.description, pr.price 
      FROM purchases p 
      JOIN products pr ON p.product_id = pr.id 
      WHERE p.user_id = ?
    `;
    db.query(purchasesQuery, [req.user.id], (err, purchaseResults) => {
      if (err) return res.status(500).json({ error: err });
      
      res.json({
        products: productResults,
        purchases: purchaseResults
      });
    });
  });
});

module.exports = router;
