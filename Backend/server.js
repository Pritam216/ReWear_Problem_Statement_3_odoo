// // server.js
// const express = require('express');
// const app = express();
// app.use('/uploads', express.static('uploads'));
// require('dotenv').config();

// const port = process.env.PORT || 3000;

// // Middleware to parse JSON and URL-encoded payloads
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Route handlers
// app.use('/auth', require('./routes/auth'));
// app.use('/products', require('./routes/products'));
// app.use('/dashboard', require('./routes/dashboard'));
// app.use('/admin', require('./routes/admin'));

// app.get('/', (req, res) => {
//   res.send("Welcome to the E-commerce Backend!");
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// // 📁 server.js (use at bottom)
// const errorHandler = require('./middleware/errorHandler');
// app.use(errorHandler);

const express = require("express");
const app = express();
require("dotenv").config();

// 📁 Make /uploads publicly accessible
app.use("/uploads", express.static("uploads"));

// Environment port
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handlers
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/admin", require("./routes/admin"));
app.use("/user", require("./routes/users"));
app.use("/public", require("./routes/public"));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce Backend!");
});

// Global error handler (keep at end)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
