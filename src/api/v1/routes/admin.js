// src/api/v1/routes/admin.js
const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply the authentication middleware to this route.
// Only requests with a valid JWT will be able to access it.
router.get('/dashboard', authMiddleware, adminController.getDashboard);

// You can add more protected admin routes here...

module.exports = router;