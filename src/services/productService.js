// src/services/productService.js
const Product = require('../models/Product');

const ProductService = {};

/**
 * Retrieves all products that are currently in stock.
 * In the future, this is where you could add more complex logic,
 * such as checking user permissions, fetching data from another
 * source, or formatting the product data.
 */
ProductService.getProducts = async () => {
  //throw new Error("This is a test error!");
  try {
    const products = await Product.findAll();
    // Here you could transform the data if needed
    return products;
  } catch (error) {
    // Log the error and re-throw it to be caught by the controller
    console.error('Error in ProductService.getProducts:', error);
    throw error;
  }
};

ProductService.addProduct = async (productData) => {
  // Here you could add logic like checking for duplicate product names, etc.
  const newProduct = await Product.create(productData);
  return newProduct;
};

ProductService.deleteProduct = async (productId) => {
  // Here you could add logic to check if the product is in any open orders before deleting.
  const deletedProduct = await Product.deleteById(productId);
  if (!deletedProduct) {
    throw new Error('Product not found');
  }
  return deletedProduct;
};

module.exports = ProductService;