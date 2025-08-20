// src/models/Product.js
const db = require('../loaders/postgres');

const Product = {};

// Finds all products that are in stock.
Product.findAll = async () => {
  const text = 'SELECT id, name, image_url, price, stock FROM product WHERE stock > 0';
  const { rows } = await db.query(text, []);
  return rows;
};

// Future functions like findById, create, update, delete will go here.
// Example:
// Product.findById = async (id) => {
//   const text = 'SELECT * FROM product WHERE id = $1';
//   const { rows } = await db.query(text, [id]);
//   return rows[0];
// };

module.exports = Product;