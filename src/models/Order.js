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

Order.findById = async (id) => {
  // Re-use the findByUuid query logic but with ID
  const text = `
    SELECT o.id, o.customer_name, o.customer_email, o.payment_uuid, o.total,
           json_agg(json_build_object('product_name', oi.product_name, 'quantity', oi.quantity, 'price', oi.price)) as items
    FROM "order" o
    LEFT JOIN order_item oi ON o.id = oi.order_id
    WHERE o.id = $1 GROUP BY o.id;
  `;
  const { rows } = await db.query(text, [id]);
  return rows[0];
};

Order.findByUuid = async (uuid) => {
  const text = `
    SELECT o.id, o.status, o.total,
           json_agg(json_build_object('product_name', oi.product_name, 'quantity', oi.quantity)) as items
    FROM "order" o
    LEFT JOIN order_item oi ON o.id = oi.order_id
    WHERE o.payment_uuid = $1
    GROUP BY o.id;
  `;
  const { rows } = await db.query(text, [uuid]);
  return rows[0]; // Returns the single order or undefined
};

Order.create = async (orderData, client) => {
  const { customer, items, total } = orderData;
  // Note: Status is now 'pending' by default from the database schema
  const orderQuery = `
    INSERT INTO "order" (customer_name, customer_email, total)
    VALUES ($1, $2, $3) RETURNING id;
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