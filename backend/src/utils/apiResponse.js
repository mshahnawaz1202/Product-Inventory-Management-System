/**
 * Standardized API response utility.
 * Ensures consistent JSON response format across all endpoints.
 */

/**
 * Send a success response.
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {*} data - Response payload
 * @param {object} [meta] - Optional pagination or extra metadata
 */
const sendSuccess = (res, statusCode = 200, message = 'Success', data = null, meta = null) => {
  const response = { success: true, message };
  if (data !== null) response.data = data;
  if (meta !== null) Object.assign(response, meta);
  return res.status(statusCode).json(response);
};
/**--------------------------------------------------------------- */

/**
 * Send an error response.
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {Array} [errors] - Optional validation errors array
 */
const sendError = (res, statusCode = 500, message = 'Internal Server Error', errors = null) => {
  const response = { success: false, message };
  if (errors) response.errors = errors;
  return res.status(statusCode).json(response);
};
/**--------------------------------------------------------------- */

module.exports = { sendSuccess, sendError };
