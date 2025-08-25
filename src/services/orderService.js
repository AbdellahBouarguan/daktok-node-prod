// src/services/orderService.js
const db = require('../loaders/postgres');
const Order = require('../models/Order');
const Product = require('../models/Product');

const OrderService = {};

OrderService.getAllOrders = async () => {
  return await Order.findAll();
};

OrderService.getOrderById = async (id) => {
    return await Order.findById(id);
};

OrderService.updateOrderStatus = async (orderId, status) => {
  // You could add logic here to send an email notification when status changes.
  const updatedOrder = await Order.updateStatus(orderId, status);
  if (!updatedOrder) {
    throw new Error('Order not found');
  }
  return updatedOrder;
};

OrderService.createOrder = async (orderData) => {
  // Stock is NOT adjusted here. Only when payment is confirmed.
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    const newOrderId = await Order.create(orderData, client);
    await client.query('COMMIT');
    return { success: true, orderId: newOrderId };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error in createOrder service:', error);
    throw new Error('Failed to create order.');
  } finally {
    client.release();
  }
};

OrderService.getOrderForPayment = async (uuid) => {
  const order = await Order.findByUuid(uuid);
  if (!order || order.status !== 'pending') {
    // If order doesn't exist or is not pending, it's not payable
    throw new Error('Invalid or already processed payment link.');
  }
  return order;
};

module.exports = OrderService;