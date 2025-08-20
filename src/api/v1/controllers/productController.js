// src/api/v1/controllers/productController.js
exports.getProducts = async (req, res, next) => {
  // In the future, this will fetch from the database.
  const products = [
    { id: 1, name: 'Cute Marvel iPhone 14 Case', price: 12.99 },
    { id: 2, name: 'Simple Test Product', price: 9.99 },
  ];
  res.status(200).json(products);
};