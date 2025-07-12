const db = require('../db');

function updateGreenPoints(userId, amount, callback) {
  const earned = Math.floor(amount / 100); // 1 point per 100 currency
  const query = `UPDATE users SET green_points_left = green_points_left + ? WHERE id = ?`;
  db.query(query, [earned, userId], callback);
}

function redeemGreenPoints(userId, redeemPoints, callback) {
  const query = `UPDATE users 
                 SET green_points_left = green_points_left - ?, 
                     green_points_used = green_points_used + ? 
                 WHERE id = ? AND green_points_left >= ?`;
  db.query(query, [redeemPoints, redeemPoints, userId, redeemPoints], callback);
}

module.exports = { updateGreenPoints, redeemGreenPoints };