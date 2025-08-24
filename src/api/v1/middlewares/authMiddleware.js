// src/api/v1/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../../../config');

const authMiddleware = (req, res, next) => {
  // 1. Get the token from the cookies
  const token = req.cookies.token;
  

  // 2. If no token is found, send an Unauthorized response
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  try {
    // 3. Verify the token using the secret key
    const decoded = jwt.verify(token, config.jwtSecret);

    // 4. Attach the decoded user information to the request object
    // This makes the user's ID and username available in all subsequent controllers
    req.user = decoded;

    // 5. Call next() to pass control to the next handler (the controller)
    next();
  } catch (error) {
    // 6. If token verification fails, send an Unauthorized response
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;