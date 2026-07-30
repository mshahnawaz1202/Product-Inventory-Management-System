const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/**
 * @desc   Register a new user
 * @route  POST /api/auth/register
 * @access Public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return sendError(res, 409, 'Email is already registered');
  }

  const user = await User.create({ name, email, password, role });
  const token = user.generateToken();

  return sendSuccess(res, 201, 'User registered successfully', { user, token });
});
/**--------------------------------------------------------------- */

/**
 * @desc   Login user and return JWT
 * @route  POST /api/auth/login
 * @access Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return sendError(res, 401, 'Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return sendError(res, 401, 'Invalid email or password');
  }

  const token = user.generateToken();

  // Remove password from response
  user.password = undefined;

  return sendSuccess(res, 200, 'Login successful', { user, token });
});
/**--------------------------------------------------------------- */

/**
 * @desc   Get current logged-in user profile
 * @route  GET /api/auth/me
 * @access Private
 */
const getMe = asyncHandler(async (req, res) => {
  return sendSuccess(res, 200, 'Profile retrieved', req.user);
});
/**--------------------------------------------------------------- */

module.exports = { register, login, getMe };
