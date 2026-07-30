const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect routes — verifies JWT Bearer token.
 * Attaches decoded user to req.user.
 */
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User no longer exists.' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Authorize specific roles.
 * Must be used after `protect` middleware.
 *
 * @param {...string} roles - Allowed roles (e.g., 'admin', 'staff')
 * @returns {Function} Express middleware
 */
const authorize = (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role(s): ${roles.join(', ')}`,
      });
    }
    return next();
  };

module.exports = { protect, authorize };
