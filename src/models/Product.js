// src/models/Product.js
const db = require('../loaders/postgres');

const Product = {};

// Finds all products that are in stock.
Product.findAll = async () => {
  const text = 'SELECT id, name, image_url, price, stock FROM product WHERE stock > 0';
  const { rows } = await db.query(text, []);
  return rows;
};

Product.findAllAdmin = async () => {
  const { rows } = await db.query('SELECT * FROM product ORDER BY id DESC', []);
  return rows;
};

Product.create = async (productData) => {
  const { name, image_url, price, stock } = productData;
  const text = 'INSERT INTO product(name, image_url, price, stock) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [name, image_url, price, stock];
  const { rows } = await db.query(text, values);
  return rows[0];
};

Product.updateStock = async (productId, quantity, client) => {
  const text = 'UPDATE product SET stock = stock - $1 WHERE id = $2';
  await client.query(text, [quantity, productId]);
};

Product.deleteById = async (id) => {
  const text = 'DELETE FROM product WHERE id = $1 RETURNING *';
  const { rows } = await db.query(text, [id]);
  return rows[0];
};


module.exports = Product;