
const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Update name, mobile, address, profile picture, bio
router.put('/update-profile', verifyToken, upload.single('profile'), (req, res) => {
  const { name, mobile, address, bio } = req.body;
  const profile_url = req.file ? req.file.filename : null;

  const updateFields = [];
  const values = [];

  if (name) { updateFields.push("username = ?"); values.push(name); }
  if (mobile) { updateFields.push("mobile = ?"); values.push(mobile); }
  if (address) { updateFields.push("address = ?"); values.push(address); }
  if (bio) { updateFields.push("bio = ?"); values.push(bio); }
  if (profile_url) { updateFields.push("profile_image = ?"); values.push(profile_url); }

  if (updateFields.length === 0) return res.status(400).json({ message: "Nothing to update" });

  const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
  values.push(req.user.id);

  db.query(query, values, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Profile updated successfully' });
  });
});

// Redeem green points
router.post('/redeem-points', verifyToken, (req, res) => {
  const { points } = req.body;
  if (!points || isNaN(points) || points <= 0) {
    return res.status(400).json({ message: 'Invalid number of points' });
  }

  const query = `UPDATE users 
                 SET green_points_left = green_points_left - ?, 
                     green_points_used = green_points_used + ? 
                 WHERE id = ? AND green_points_left >= ?`;

  db.query(query, [points, points, req.user.id, points], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Not enough green points to redeem' });
    }
    res.json({ message: `Successfully redeemed ${points} green points` });
  });
});
// Get current user's profile
router.get('/me', verifyToken, (req, res) => {
  const query = 'SELECT id, username, email, mobile, address, profile_image, bio, green_points_left, green_points_used FROM users WHERE id = ?';
  db.query(query, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});
// 📁 routes/users.js or routes/purchase.js
router.post('/purchase', verifyToken, (req, res) => {
  const { product_id, useGreenPoints = 0, swapProductIds = [], payWithMoney = false } = req.body;
  const userId = req.user.id;

  db.query('SELECT price FROM products WHERE id = ?', [product_id], (err, productRes) => {
    if (err || productRes.length === 0) return res.status(404).json({ message: 'Product not found' });

    const productPrice = productRes[0].price;

    // Check ownership of swap items
    const placeholders = swapProductIds.map(() => '?').join(',');
    const swapCheckQuery = swapProductIds.length
      ? `SELECT COUNT(*) AS count FROM products WHERE id IN (${placeholders}) AND seller_id = ?`
      : null;

    const checkSwapOwnership = (cb) => {
  if (!swapCheckQuery) return cb(null, 0); // no swap

  db.query(`SELECT id, price FROM products WHERE id IN (${placeholders}) AND seller_id = ? AND is_sold = 0`, [...swapProductIds, userId], (err, products) => {
    if (err) return cb(err);

    if (products.length !== swapProductIds.length) {
      return cb(new Error('One or more swap products are invalid'));
    }

    const swapValue = products.reduce((total, product) => total + product.price, 0);
    cb(null, swapValue);
  });
};

    checkSwapOwnership((err, swapValue) => {
      if (err) return res.status(400).json({ message: err.message });

      const remainingAfterSwap = productPrice - swapValue;

      db.query('SELECT green_points_left FROM users WHERE id = ?', [userId], (err, userRes) => {
        if (err) return res.status(500).json({ error: err });

        const userPoints = userRes[0].green_points_left;

        if (useGreenPoints > userPoints) {
          return res.status(400).json({ message: 'You do not have enough green points' });
        }

        const remainingAfterPoints = remainingAfterSwap - useGreenPoints;

        if (remainingAfterPoints > 0 && !payWithMoney) {
          return res.status(400).json({ message: `Not enough green points or swaps. ₹${remainingAfterPoints} still needed. Set payWithMoney: true to complete with cash.` });
        }

        // All validations passed, process purchase
        processPurchase(userId, product_id, useGreenPoints, swapProductIds, remainingAfterPoints);
      });
    });

    function processPurchase(userId, productId, pointsUsed, swapIds, moneyPaid) {
  // 1. Deduct green points
  db.query(`UPDATE users 
    SET green_points_left = green_points_left - ?, 
        green_points_used = green_points_used + ? 
    WHERE id = ?`, [pointsUsed, pointsUsed, userId]);

  // 2. Remove swapped products
  if (swapIds.length > 0) {
    db.query(`DELETE FROM products WHERE id IN (${placeholders})`, swapIds);
  }

  // 3. Mark product as sold
  db.query(`UPDATE products SET is_sold = 1, buyer_id = ? WHERE id = ?`, [userId, productId]);

  // 4. Reward green points for full product price
  const reward = Math.floor(productPrice / 100);
  db.query(`UPDATE users SET green_points_left = green_points_left + ? WHERE id = ?`, [reward, userId], (err) => {
    if (err) return res.status(500).json({ message: 'Purchase completed, but failed to reward points' });

    // ✅ Send response only after DB is updated
    res.json({
      message: 'Purchase successful!',
      green_points_used: pointsUsed,
      swap_items_used: swapIds,
      money_paid: moneyPaid || 0,
      reward_earned: reward
    });
  });
}
  });
});


module.exports = router;