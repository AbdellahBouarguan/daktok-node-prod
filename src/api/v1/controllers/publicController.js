// src/api/v1/controllers/publicController.js
const OrderService = require('../../../services/orderService');

exports.submitOrder = async (req, res, next) => {
  try {
    const result = await OrderService.createOrder(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};