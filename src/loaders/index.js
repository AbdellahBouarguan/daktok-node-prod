// src/loaders/index.js
const expressLoader = require('./express');
const postgresLoader = require('./postgres');

exports.init = (app) => {
  // Perform a quick connection test to the database.
  // If this fails, the app will crash, preventing it from running in a broken state.
  postgresLoader.pool.connect((err, client, release) => {
    if (err) {
      console.error('❌ Failed to connect to PostgreSQL', err.stack);
      process.exit(1); // Exit with a failure code
    }
    console.log('🐘 PostgreSQL successfully connected');
    // Release the client back to the pool
    release();
  });

  expressLoader(app);
  console.log('✅ Express loaded');
};