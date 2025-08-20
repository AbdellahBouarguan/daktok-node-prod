const dotenv = require('dotenv');

// Load .env file
const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash the whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

// Set the NODE_ENV to 'development' if it's not already set.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  port: parseInt(process.env.PORT, 10),
  // We will add more configuration here later (database, API keys, etc.)

  // Centralized database configuration object
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwtSecret: process.env.JWT_SECRET,
};