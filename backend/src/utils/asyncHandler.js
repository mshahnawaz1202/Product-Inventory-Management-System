/**
 * Wraps async route handlers to eliminate try/catch boilerplate.
 * Any rejected promise is forwarded to Express error middleware via next().
 *
 * @param {Function} fn - Async route handler function
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
/**--------------------------------------------------------------- */

module.exports = asyncHandler;
