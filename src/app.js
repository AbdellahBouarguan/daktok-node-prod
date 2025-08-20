// src/app.js
const express = require('express');
const config = require('./config');
const loaders = require('./loaders');

async function startServer() {
  const app = express();

  // Initialize all application loaders
  loaders.init(app);

  app.listen(config.port, () => {
    console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  }).on('error', err => {
    console.error(err);
    process.exit(1);
  });
}

startServer();