// src/loaders/express.js
const express = require('express');
const path = require('path');
const productRoutes = require('../api/v1/routes/products');

module.exports = (app) => {
  // Middleware to parse JSON bodies
  app.use(express.json());
  // Middleware to parse URL-encoded bodies
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, '../../public')));

  // Set the view engine to EJS
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../../views'));

  // API Routes
  app.use('/api/v1', productRoutes);

  // Simple status check endpoint
  app.get('/status', (req, res) => {
    res.status(200).json({ message: 'Server is running' }).end();
  });

  // We will add more routes and error handling middleware here
};