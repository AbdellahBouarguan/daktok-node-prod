// src/api/v1/routes/public.js
const express = require('express');
const publicController = require('../controllers/publicController');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.post('/orders', publicController.submitOrder);
router.post('/orders/:id/pay/cod', paymentController.handleCodPayment);


module.exports = router;