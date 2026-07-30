const express = require('express');
const {
  getDashboardStats,
  getRecentMovements,
  getMovementChart,
  getLowStockProducts,
  getInventoryByCategory,
} = require('../controllers/dashboard.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard analytics and summary data
 */

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get overall inventory statistics
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard stats object
 */
router.get('/stats', protect, getDashboardStats);

/**
 * @swagger
 * /dashboard/recent-movements:
 *   get:
 *     summary: Get last 10 stock movements
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Recent movements array
 */
router.get('/recent-movements', protect, getRecentMovements);

/**
 * @swagger
 * /dashboard/movement-chart:
 *   get:
 *     summary: Get 30-day movement chart data
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Chart data grouped by date and type
 */
router.get('/movement-chart', protect, getMovementChart);

/**
 * @swagger
 * /dashboard/low-stock:
 *   get:
 *     summary: Get list of low stock products
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Low stock product list
 */
router.get('/low-stock', protect, getLowStockProducts);

/**
 * @swagger
 * /dashboard/inventory-by-category:
 *   get:
 *     summary: Get inventory breakdown by category
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Category-based inventory summary
 */
router.get('/inventory-by-category', protect, getInventoryByCategory);

module.exports = router;
