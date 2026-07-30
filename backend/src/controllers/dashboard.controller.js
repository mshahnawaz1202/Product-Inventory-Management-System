const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');
const StockMovement = require('../models/StockMovement');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');

/**
 * @desc   Get dashboard summary statistics
 * @route  GET /api/dashboard/stats
 * @access Private
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const [
    totalProducts,
    totalCategories,
    totalSuppliers,
    lowStockProducts,
    outOfStockProducts,
    todayMovements,
    inventoryValueAgg,
    totalStockUnitsAgg,
  ] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    Supplier.countDocuments(),
    Product.countDocuments({ quantity_in_stock: { $gt: 0, $lt: 10 } }),
    Product.countDocuments({ quantity_in_stock: 0 }),
    StockMovement.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay } }),
    Product.aggregate([
      { $group: { _id: null, totalValue: { $sum: { $multiply: ['$unit_price', '$quantity_in_stock'] } } } },
    ]),
    Product.aggregate([
      { $group: { _id: null, totalUnits: { $sum: '$quantity_in_stock' } } },
    ]),
  ]);

  const totalInventoryValue = inventoryValueAgg[0]?.totalValue || 0;
  const totalStockUnits = totalStockUnitsAgg[0]?.totalUnits || 0;

  return sendSuccess(res, 200, 'Dashboard stats retrieved', {
    totalProducts,
    totalCategories,
    totalSuppliers,
    totalInventoryValue,
    totalStockUnits,
    lowStockProducts,
    outOfStockProducts,
    todayMovements,
  });
});
/**--------------------------------------------------------------- */

/**
 * @desc   Get recent stock movements (last 10)
 * @route  GET /api/dashboard/recent-movements
 * @access Private
 */
const getRecentMovements = asyncHandler(async (req, res) => {
  const movements = await StockMovement.find()
    .populate('product_id', 'name sku')
    .populate('user_id', 'name')
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  return sendSuccess(res, 200, 'Recent movements retrieved', movements);
});
/**--------------------------------------------------------------- */

/**
 * @desc   Get stock movement chart data (last 30 days)
 * @route  GET /api/dashboard/movement-chart
 * @access Private
 */
const getMovementChart = asyncHandler(async (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const chartData = await StockMovement.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo } } },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          type: '$type',
        },
        total: { $sum: '$quantity' },
      },
    },
    { $sort: { '_id.date': 1 } },
  ]);

  return sendSuccess(res, 200, 'Movement chart data retrieved', chartData);
});
/**--------------------------------------------------------------- */

/**
 * @desc   Get low stock products list
 * @route  GET /api/dashboard/low-stock
 * @access Private
 */
const getLowStockProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ quantity_in_stock: { $gt: 0, $lt: 10 } })
    .populate('category_id', 'name')
    .populate('supplier_id', 'name')
    .sort({ quantity_in_stock: 1 })
    .limit(20)
    .lean({ virtuals: true });

  return sendSuccess(res, 200, 'Low stock products retrieved', products);
});
/**--------------------------------------------------------------- */

/**
 * @desc   Get inventory value breakdown by category
 * @route  GET /api/dashboard/inventory-by-category
 * @access Private
 */
const getInventoryByCategory = asyncHandler(async (req, res) => {
  const data = await Product.aggregate([
    {
      $group: {
        _id: '$category_id',
        totalProducts: { $sum: 1 },
        totalUnits: { $sum: '$quantity_in_stock' },
        totalValue: { $sum: { $multiply: ['$unit_price', '$quantity_in_stock'] } },
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 0,
        categoryName: '$category.name',
        totalProducts: 1,
        totalUnits: 1,
        totalValue: 1,
      },
    },
    { $sort: { totalValue: -1 } },
  ]);

  return sendSuccess(res, 200, 'Inventory by category retrieved', data);
});
/**--------------------------------------------------------------- */

module.exports = {
  getDashboardStats,
  getRecentMovements,
  getMovementChart,
  getLowStockProducts,
  getInventoryByCategory,
};
