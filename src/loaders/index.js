// src/loaders/index.js
const expressLoader = require('./express');

exports.init = (app) => {
  expressLoader(app);
  console.log('✅ Express loaded');

  // In the future, we'll add other loaders here (e.g., database, logging)
};