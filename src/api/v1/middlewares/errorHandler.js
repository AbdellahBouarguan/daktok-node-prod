// src/api/v1/middlewares/errorHandler.js
// This middleware will run whenever a route handler calls `next(error)`.
const errorHandler = (err, req, res, next) => {
  // In a real app, you would log the error to a file or a logging service.
  console.error(err.stack);

  // For now, send a generic 500 Internal Server Error response.
  // Avoid sending detailed error information to the client in production.
  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred on the server.',
  });
};

module.exports = errorHandler;