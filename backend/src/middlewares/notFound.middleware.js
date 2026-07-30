/**
 * 404 Not Found middleware.
 * Catches any request that doesn't match a defined route.
 */
const notFoundMiddleware = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = notFoundMiddleware;
