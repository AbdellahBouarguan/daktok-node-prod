// src/api/v1/routes/public.js
const express = require('express');
const publicController = require('../controllers/publicController');
const router = express.Router();

router.post('/orders', publicController.submitOrder);

module.exports = router;