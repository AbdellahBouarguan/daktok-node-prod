// src/api/v1/routes/admin.js
const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateProduct } = require('../middlewares/validationMiddleware');


const router = express.Router();

// Apply the authentication middleware to this route.
// Only requests with a valid JWT will be able to access it.
router.get('/dashboard', authMiddleware, adminController.getDashboard);
router.get('/products', adminController.getProductsForAdmin);

// You can add more protected admin routes here...
// Product Management Routes
router.post('/products', validateProduct, adminController.addProduct);
router.delete('/products/:id', adminController.deleteProduct);

// Order Management Routes
router.get('/orders', adminController.getOrders);
router.post('/orders/:id/status', adminController.updateOrderStatus);

module.exports = router;