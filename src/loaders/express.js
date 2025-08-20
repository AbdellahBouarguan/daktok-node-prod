// src/loaders/express.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const productRoutes = require('../api/v1/routes/products');
const authRoutes = require('../api/v1/routes/auth'); // Import auth routes

const errorHandler = require('../api/v1/middlewares/errorHandler'); // Import the handler


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

   app.use(cookieParser()); // Use the cookie-parser middleware

  // API Routes
  app.use('/api/v1', productRoutes);
  app.use('/api/v1/auth', authRoutes);

  // Simple status check endpoint
  app.get('/status', (req, res) => {
    res.status(200).json({ message: 'Server is running' }).end();
  });

  // We will add more routes and error handling middleware here
  app.use(errorHandler);
};