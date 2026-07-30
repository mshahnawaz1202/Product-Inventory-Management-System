const express = require('express');
const { createMovement, getAllMovements, getMovementById } = require('../controllers/stockMovement.controller');
const { protect } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createStockMovementSchema, stockMovementQuerySchema } = require('../validators/stockMovement.validator');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Stock Movements
 *   description: Inventory stock movement management
 */

/**
 * @swagger
 * /stock-movements:
 *   get:
 *     summary: Get all stock movements with filters
 *     tags: [Stock Movements]
 *     parameters:
 *       - in: query
 *         name: product_id
 *         schema: { type: string }
 *       - in: query
 *         name: type
 *         schema: { type: string, enum: [IN, OUT] }
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Paginated movement list
 */
router.get('/', protect, validate(stockMovementQuerySchema), getAllMovements);

/**
 * @swagger
 * /stock-movements/{id}:
 *   get:
 *     summary: Get stock movement by ID
 *     tags: [Stock Movements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Movement detail
 */
router.get('/:id', protect, getMovementById);

/**
 * @swagger
 * /stock-movements:
 *   post:
 *     summary: Create a stock movement (IN or OUT)
 *     tags: [Stock Movements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_id, type, quantity]
 *             properties:
 *               product_id: { type: string }
 *               type: { type: string, enum: [IN, OUT] }
 *               quantity: { type: integer, minimum: 1 }
 *               reason: { type: string }
 *     responses:
 *       201:
 *         description: Movement recorded
 *       400:
 *         description: Insufficient stock
 */
router.post('/', protect, validate(createStockMovementSchema), createMovement);

module.exports = router;
