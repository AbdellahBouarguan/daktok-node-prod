const express = require('express');
const config = require('./config'); // Automatically imports from src/config/index.js

async function startServer() {
  const app = express();

  // We will load all the Express middleware and routes here in the next steps
  // For now, let's just add a basic route to confirm it works.
  app.get('/status', (req, res) => {
    res.status(200).json({ message: 'Server is running' }).end();
  });

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