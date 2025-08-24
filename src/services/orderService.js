// src/services/orderService.js
const Order = require('../models/Order');
const OrderService = {};

OrderService.getAllOrders = async () => {
  return await Order.findAll();
};

OrderService.updateOrderStatus = async (orderId, status) => {
  // You could add logic here to send an email notification when status changes.
  const updatedOrder = await Order.updateStatus(orderId, status);
  if (!updatedOrder) {
    throw new Error('Order not found');
  }
  return updatedOrder;
};

module.exports = OrderService;