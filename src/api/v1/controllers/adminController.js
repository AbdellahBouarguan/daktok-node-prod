// src/api/v1/controllers/adminController.js
exports.getDashboard = (req, res) => {
  // Thanks to the middleware, we can access the authenticated user's info
  const user = req.user;

  res.status(200).json({
    success: true,
    message: `Welcome to the admin dashboard, ${user.username}!`,
    user: user,
  });
};