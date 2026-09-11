const jwt = require('jsonwebtoken');
const db = require('../services/databaseService');

const JWT_SECRET = process.env.JWT_SECRET || 'bhasha_setu_secret_key_sih_2026_tribal_platform';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required. Please login.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Session expired or invalid token.' });
    }
    const user = db.findUserById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    req.user = user;
    next();
  });
}

function optionalToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (!err && decoded) {
      req.user = db.findUserById(decoded.id) || null;
    } else {
      req.user = null;
    }
    next();
  });
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }
    if (req.user.role !== role && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: `Access restricted to ${role}s.` });
    }
    next();
  };
}

module.exports = {
  authenticateToken,
  optionalToken,
  requireRole,
  JWT_SECRET
};