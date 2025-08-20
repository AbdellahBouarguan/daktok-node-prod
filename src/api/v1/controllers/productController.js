// src/api/v1/controllers/productController.js
const Product = require('../../../models/Product');

exports.getProducts = async (req, res, next) => {
  try {
    // Call the data access layer to get products
    const products = await Product.findAll();
    // Send the database results as a JSON response
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Pass the error to the next middleware. This is key for centralized error handling.
    next(error);
  }
};