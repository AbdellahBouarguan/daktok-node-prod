// src/loaders/postgres.js
const { Pool } = require('pg');
const config = require('../config');

// Create a new pool instance using our centralized configuration.
// The pool will manage multiple client connections.
const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.name,
  password: config.database.password,
  port: config.database.port,
});

// Export the pool and a centralized query function.
// By using this query function everywhere, if you ever need to add logging
// or monitoring for all queries, you can do it in one place.
module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};