const StockMovement = require('../models/StockMovement');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const { getPaginationParams, buildPaginationMeta } = require('../utils/pagination');
const { createStockMovement } = require('../services/stock.service');

/**
 * @desc   Create a new stock movement (IN or OUT)
 * @route  POST /api/stock-movements
 * @access Private
 */
const createMovement = asyncHandler(async (req, res) => {
  const { product_id, type, quantity, reason } = req.body;
  const user_id = req.user?._id || null;

  const { movement, product } = await createStockMovement({ product_id, type, quantity, reason, user_id });

  return sendSuccess(res, 201, `Stock ${type} recorded successfully`, { movement, product });
});
/**--------------------------------------------------------------- */

/**
 * @desc   Get all stock movements with filters and pagination
 * @route  GET /api/stock-movements
 * @access Private
 */
const getAllMovements = asyncHandler(async (req, res) => {
  const { page, pageSize, skip } = getPaginationParams(req.query);
  const { product_id, type, from, to, sort = 'createdAt', order = 'desc' } = req.query;

  const filter = {};
  if (product_id) filter.product_id = product_id;
  if (type) filter.type = type;

  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = toDate;
    }
  }

  const sortObj = { [sort]: order === 'asc' ? 1 : -1 };

  const [movements, total] = await Promise.all([
    StockMovement.find(filter)
      .populate('product_id', 'name sku')
      .populate('user_id', 'name email')
      .sort(sortObj)
      .skip(skip)
      .limit(pageSize)
      .lean(),
    StockMovement.countDocuments(filter),
  ]);

  return sendSuccess(res, 200, 'Stock movements retrieved', movements, buildPaginationMeta(total, page, pageSize));
});
/**--------------------------------------------------------------- */

/**
 * @desc   Get stock movement by ID
 * @route  GET /api/stock-movements/:id
 * @access Private
 */
const getMovementById = asyncHandler(async (req, res) => {
  const movement = await StockMovement.findById(req.params.id)
    .populate('product_id', 'name sku quantity_in_stock')
    .populate('user_id', 'name email')
    .lean();

  if (!movement) {
    const err = new Error('Stock movement not found');
    err.statusCode = 404;
    throw err;
  }

  return sendSuccess(res, 200, 'Stock movement retrieved', movement);
});
/**--------------------------------------------------------------- */

module.exports = { createMovement, getAllMovements, getMovementById };
