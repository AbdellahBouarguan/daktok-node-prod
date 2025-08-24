// src/api/v1/middlewares/visitorMiddleware.js
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const Visitor = require('../../../models/Visitor');

const trackVisitor = async (req, res, next) => {
  // Don't track requests for static files
  if (req.path.startsWith('/js') || req.path.startsWith('/css') || req.path.startsWith('/images')) {
    return next();
  }

  let visitorId = req.cookies.visitor_id;

  if (!visitorId) {
    visitorId = uuidv4();
    // Set the cookie on the response object
    res.cookie('visitor_id', visitorId, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
    });
  }

  try {
    const recentVisit = await Visitor.findByVisitorIdAndRecent(visitorId);

    // If no recent visit is found in the last 15 mins, log this one
    if (!recentVisit) {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
      const userAgent = req.headers['user-agent'];

      let city = 'Unknown';
      let country = 'Unknown';

      // Geolocation will not work for local IPs, which is expected
      if (ip !== '127.0.0.1' && !ip.startsWith('192.168.')) {
        try {
          const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
          city = geo.data.city || 'Unknown';
          country = geo.data.country_name || 'Unknown';
        } catch (geoError) {
          console.error('Geolocation lookup failed:', geoError.message);
        }
      }

      await Visitor.create({ ip, userAgent, visitorId, city, country });
    }
  } catch (dbError) {
    console.error('Visitor tracking database error:', dbError);
  }

  next();
};

module.exports = trackVisitor;