// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  // Expecting header: Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  if (!authHeader)
    return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  if (!token)
    return res.status(401).json({ message: 'No token provided' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: 'Failed to authenticate token' });
    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Requires admin role' });
  }
};

module.exports = { verifyToken, isAdmin };
