// src/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const config = require('../config');

const AuthService = {};

AuthService.login = async (username, password) => {
  const user = await AdminUser.findByUsername(username);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, username: user.username }, config.jwtSecret, {
    expiresIn: '1h', // Token will expire in 1 hour
  });

  return token;
};

module.exports = AuthService;