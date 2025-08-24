// src/services/analyticsService.js
const Visitor = require('../models/Visitor');
const AnalyticsService = {};

AnalyticsService.getVisitorAnalytics = async () => {
  return await Visitor.getAnalytics();
};

module.exports = AnalyticsService;