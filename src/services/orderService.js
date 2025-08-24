// src/services/orderService.js
const db = require('../loaders/postgres');
const Order = require('../models/Order');
const Product = require('../models/Product');

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

OrderService.createOrder = async (orderData) => {
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN'); // Start transaction

    // 1. Create the order and its items
    const newOrderId = await Order.create(orderData, client);

    // 2. Update stock for each item in the order
    for (const item of orderData.items) {
      await Product.updateStock(item.id, item.qty, client);
    }

    await client.query('COMMIT'); // Commit transaction
    return { success: true, orderId: newOrderId };
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback on error
    console.error('Error in createOrder service:', error);
    throw new Error('Failed to create order.');
  } finally {
    client.release();
  }
};

module.exports = OrderService;