// src/api/v1/controllers/adminController.js

const ProductService = require('../../../services/productService');
const PDFService = require('../../../services/pdfService'); // Import PDF Service
const OrderService = require('../../../services/orderService');

const AnalyticsService = require('../../../services/analyticsService');

exports.getDashboard = (req, res) => {
  // Thanks to the middleware, we can access the authenticated user's info
  const user = req.user;

  res.status(200).json({
    success: true,
    message: `Welcome to the admin dashboard, ${user.username}!`,
    user: user,
  });
};

exports.getProductsForAdmin = async (req, res, next) => {
  try {
    const products = await ProductService.getAllProductsForAdmin();
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const newProduct = await ProductService.addProduct(req.body);
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProductService.deleteProduct(id);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};


exports.getOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json({ success: true, orders: orders });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await OrderService.updateOrderStatus(id, status);
    res.status(200).json({ success: true, message: 'Order status updated' });
  } catch (error) {
    next(error);
  }
};

exports.generateInvoice = async (req, res, next) => {
  try {
    // We need a way to get a single order's details
    const order = await OrderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const pdfBuffer = await PDFService.generateInvoice(order);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${order.id}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    const analyticsData = await AnalyticsService.getVisitorAnalytics();
    res.status(200).json({ success: true, data: analyticsData });
  } catch (error) {
    next(error);
  }
};