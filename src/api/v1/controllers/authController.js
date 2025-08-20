// src/api/v1/controllers/authController.js
const AuthService = require('../../../services/authService');

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const token = await AuthService.login(username, password);

    res.cookie('token', token, {
      httpOnly: true, // The cookie cannot be accessed by client-side scripts
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ success: true, message: 'Logged in successfully' });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};