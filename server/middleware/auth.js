const jwt = require('jsonwebtoken'); // Imports the JSON Web Token library for token verification.
require('dotenv').config(); // Loads environment variables from a `.env` file.

/**
 * Middleware to protect routes and validate JSON Web Token (JWT).
 * Checks for the presence of a token in the request headers and verifies its validity.
 */
const protect = (req, res, next) => {
  let token;

  // Check if the `Authorization` header contains a Bearer token.
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Extract the token from the `Authorization` header.
    token = req.headers.authorization.split(' ')[1];

    try {
      // Verify the token using the secret key from environment variables.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach the decoded user information to the `req` object.
      next(); // Proceed to the next middleware or route handler.
    } catch (error) {
      // Handle cases where token verification fails.
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // Respond with an error if no token is provided.
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

/**
 * Middleware to restrict access to admin users.
 * Ensures the user has an admin role before proceeding.
 */
const admin = (req, res, next) => {
  // Check if the `req.user` exists and the role is `admin`.
  if (req.user && req.user.role === 'admin') {
    next(); // Proceed if the user is an admin.
  } else {
    // Respond with a forbidden status if the user is not an admin.
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

module.exports = { protect, admin }; // Exports the `protect` and `admin` middleware for use in other parts of the application.
