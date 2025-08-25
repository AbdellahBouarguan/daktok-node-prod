// src/api/v1/controllers/paymentController.js
const OrderService = require('../../../services/orderService');

exports.handleCodPayment = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    // In a real scenario, you might have more logic here.
    // For COD, we just update the status to "paid".
    await OrderService.updateOrderStatus(orderId, 'paid');
    res.status(200).json({ success: true, message: 'Order confirmed for Cash on Delivery.' });
  } catch (error) {
    next(error);
  }
};