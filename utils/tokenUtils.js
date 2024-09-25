const jwt = require('jsonwebtoken');

// You should store this secret in an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

exports.createToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1d' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};