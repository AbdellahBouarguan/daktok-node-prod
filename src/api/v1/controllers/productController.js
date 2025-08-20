// src/api/v1/controllers/productController.js
const ProductService = require('../../../services/productService'); // Updated import

exports.getProducts = async (req, res, next) => {
  try {
    // The controller's job is to call the service and send the response.
    const products = await ProductService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    // The controller doesn't handle the error, it just passes it on.
    next(error);
  }
};