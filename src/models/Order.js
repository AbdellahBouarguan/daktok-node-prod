// src/models/Order.js
const db = require('../loaders/postgres');
const Order = {};

Order.findAll = async () => {
  // We use a JOIN to also fetch the items associated with each order
  const text = `
    SELECT o.id, o.customer_name, o.customer_email, o.total, o.status, o.created_at,
           json_agg(json_build_object('product_name', oi.product_name, 'quantity', oi.quantity, 'price', oi.price)) as items
    FROM "order" o
    LEFT JOIN order_item oi ON o.id = oi.order_id
    GROUP BY o.id
    ORDER BY o.created_at DESC;
  `;
  const { rows } = await db.query(text);
  return rows;
};

Order.updateStatus = async (orderId, status) => {
  const text = 'UPDATE "order" SET status = $1 WHERE id = $2 RETURNING *';
  const { rows } = await db.query(text, [status, orderId]);
  return rows[0];
};

module.exports = Order;