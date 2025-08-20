// src/api/v1/routes/products.js
const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/products', productController.getProducts);

module.exports = router;