// scripts/seed-admin.js
const bcrypt = require('bcrypt');
const db = require('../src/loaders/postgres');

const username = 'admin'; // Or your desired username
const password = 'password123'; // Choose a strong password

async function seedAdmin() {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db.query(
      'INSERT INTO admin_user (username, password_hash) VALUES ($1, $2)',
      [username, hashedPassword]
    );

    console.log('✅ Admin user created successfully.');
  } catch (error) {
    if (error.code === '23505') { // Unique constraint violation
      console.log('⚠️ Admin user already exists.');
    } else {
      console.error('Error creating admin user:', error);
    }
  } finally {
    db.pool.end(); // Close the database connection
  }
}

seedAdmin();