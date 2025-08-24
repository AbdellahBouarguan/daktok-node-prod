// src/api/v1/routes/pages.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Public pages
router.get('/', (req, res) => res.render('index')); 
router.get('/login', (req, res) => res.render('login'));

// Admin pages (protected)
router.get('/admin', authMiddleware, (req, res) => res.render('admin'));
router.get('/admin/analytics', authMiddleware, (req, res) => res.render('admin/analytics'));

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

module.exports = router;