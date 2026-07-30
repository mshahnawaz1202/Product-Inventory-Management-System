const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  exportProducts,
  importProducts,
} = require('../controllers/product.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const upload = require('../middlewares/upload.middleware');
const {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
} = require('../validators/product.validator');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products (with pagination, search, filters)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: pageSize
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: category_id
 *         schema: { type: string }
 *       - in: query
 *         name: supplier_id
 *         schema: { type: string }
 *       - in: query
 *         name: stock_status
 *         schema: { type: string, enum: [in_stock, low_stock, out_of_stock] }
 *       - in: query
 *         name: sort
 *         schema: { type: string }
 *       - in: query
 *         name: order
 *         schema: { type: string, enum: [asc, desc] }
 *     responses:
 *       200:
 *         description: Paginated product list
 */
router.get('/', protect, validate(productQuerySchema), getAllProducts);

/**
 * @swagger
 * /products/export:
 *   get:
 *     summary: Export products as CSV
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: CSV file download
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 */
router.get('/export', protect, exportProducts);

/**
 * @swagger
 * /products/import:
 *   post:
 *     summary: Import products from CSV
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Import result summary
 */
router.post('/import', protect, upload.single('file'), importProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Product detail
 *       404:
 *         description: Not found
 */
router.get('/:id', protect, getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 *       409:
 *         description: SKU already exists
 */
router.post('/', protect, validate(createProductSchema), createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put('/:id', protect, validate(updateProductSchema), updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Product deleted
 *       403:
 *         description: Forbidden
 */
router.delete('/:id', protect, authorize('admin'), deleteProduct);

/**
 * @swagger
 * /products/{id}/stock-movements:
 *   post:
 *     summary: Record a stock movement for a specific product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       201:
 *         description: Movement recorded and stock updated
 *       400:
 *         description: Insufficient stock for OUT movement
 */
const { createMovement } = require('../controllers/stockMovement.controller');
const { createStockMovementSchema } = require('../validators/stockMovement.validator');

router.post(
  '/:id/stock-movements',
  protect,
  (req, _res, next) => { req.body.product_id = req.params.id; next(); },
  validate(createStockMovementSchema),
  createMovement
);

module.exports = router;
