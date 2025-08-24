const db = require('../src/loaders/postgres');

async function seedOrders() {
  const client = await db.pool.connect(); // Get a client from the pool
  try {
    console.log('Seeding sample order...');

    // Start a transaction
    await client.query('BEGIN');

    // 1. Insert a sample order into the "order" table
    const orderQuery = `
      INSERT INTO "order" (customer_name, customer_email, total, status)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const orderValues = ['John Doe', 'john.doe@example.com', 42.97, 'pending'];
    const orderResult = await client.query(orderQuery, orderValues);
    const newOrderId = orderResult.rows[0].id;

    console.log(`Created order with ID: ${newOrderId}`);

    // 2. Insert items for that order into the "order_item" table
    const item1Query = `
      INSERT INTO order_item (order_id, product_name, quantity, price)
      VALUES ($1, $2, $3, $4);
    `;
    const item1Values = [newOrderId, 'Cute Marvel iPhone 14 Case', 1, 12.99];
    await client.query(item1Query, item1Values);
    console.log('Added item: Cute Marvel iPhone 14 Case');

    const item2Query = `
      INSERT INTO order_item (order_id, product_name, quantity, price)
      VALUES ($1, $2, $3, $4);
    `;
    const item2Values = [newOrderId, 'Simple Test Product', 3, 9.99];
    await client.query(item2Query, item2Values);
    console.log('Added item: Simple Test Product');

    // Commit the transaction
    await client.query('COMMIT');

    console.log('✅ Sample order created successfully.');

  } catch (error) {
    // If an error occurs, roll back the transaction
    await client.query('ROLLBACK');
    console.error('Error creating sample order:', error);
  } finally {
    // Release the client back to the pool
    client.release();
    // Close the entire pool
    db.pool.end();
  }
}

seedOrders();