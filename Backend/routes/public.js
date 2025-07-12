const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /public/listings - fetch all product listings
router.get("/listings", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.json(results);
  });
});

// You can add more public endpoints here (e.g., categories)

module.exports = router;
