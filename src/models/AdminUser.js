// src/models/AdminUser.js
const db = require('../loaders/postgres');

const AdminUser = {};

AdminUser.findByUsername = async (username) => {
  const text = 'SELECT * FROM admin_user WHERE username = $1';
  const { rows } = await db.query(text, [username]);
  return rows[0];
};

module.exports = AdminUser;