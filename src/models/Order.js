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

Order.create = async (orderData, client) => {
  // The 'client' is a connection from a transaction
  const { customer, items, total } = orderData;
  const orderQuery = `
    INSERT INTO "order" (customer_name, customer_email, total, status)
    VALUES ($1, $2, $3, 'paid') RETURNING id;
  `;
  const orderResult = await client.query(orderQuery, [customer.name, customer.email, total]);
  const newOrderId = orderResult.rows[0].id;

  for (const item of items) {
    const itemQuery = `
      INSERT INTO order_item (order_id, product_name, quantity, price)
      VALUES ($1, $2, $3, $4);
    `;
    await client.query(itemQuery, [newOrderId, item.name, item.qty, item.price]);
  }
  return newOrderId;
};

Order.updateStatus = async (orderId, status) => {
  const text = 'UPDATE "order" SET status = $1 WHERE id = $2 RETURNING *';
  const { rows } = await db.query(text, [status, orderId]);
  return rows[0];
};

module.exports = Order;