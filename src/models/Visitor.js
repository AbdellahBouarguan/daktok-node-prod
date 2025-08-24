// src/models/Visitor.js
const db = require('../loaders/postgres');

// 1. Create an empty object to hold our functions
const Visitor = {};

// 2. Attach the getAnalytics function as a property of the Visitor object
Visitor.getAnalytics = async () => {
  const totalVisitsQuery = db.query('SELECT COUNT(*) FROM visitor');
  const uniqueVisitorsQuery = db.query('SELECT COUNT(DISTINCT visitor_id) FROM visitor');
  const recentVisitsQuery = db.query('SELECT * FROM visitor ORDER BY visited_at DESC LIMIT 20');

  const [totalVisitsResult, uniqueVisitorsResult, recentVisitsResult] = await Promise.all([
    totalVisitsQuery,
    uniqueVisitorsQuery,
    recentVisitsQuery,
  ]);

  return {
    total: parseInt(totalVisitsResult.rows[0].count, 10),
    unique: parseInt(uniqueVisitorsResult.rows[0].count, 10),
    recent: recentVisitsResult.rows,
  };
};

// ADD THIS FUNCTION
Visitor.findByVisitorIdAndRecent = async (visitorId) => {
  const text = `
    SELECT * FROM visitor
    WHERE visitor_id = $1 AND visited_at >= NOW() - INTERVAL '15 minutes'
  `;
  const { rows } = await db.query(text, [visitorId]);
  return rows[0];
};

// ADD THIS FUNCTION
Visitor.create = async (visitData) => {
  const { ip, userAgent, visitorId, city, country } = visitData;
  const text = `
    INSERT INTO visitor (ip_address, user_agent, visitor_id, city, country)
    VALUES ($1, $2, $3, $4, $5)
  `;
  await db.query(text, [ip, userAgent, visitorId, city, country]);
};


// 3. Export the Visitor object with the function attached to it
module.exports = Visitor;