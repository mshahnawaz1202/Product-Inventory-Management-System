const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { getPaginationParams, buildPaginationMeta } = require('../utils/pagination');
const { exportProductsToCSV, importProductsFromCSV } = require('../services/csv.service');

/**
 * @desc   Get all products with pagination, search, filter, sort
 * @route  GET /api/products
 * @access Private
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const { page, pageSize, skip } = getPaginationParams(req.query);
  const { search, category_id, supplier_id, stock_status, sort = 'createdAt', order = 'desc' } = req.query;

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { sku: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (category_id) filter.category_id = category_id;
  if (supplier_id) filter.supplier_id = supplier_id;

  if (stock_status === 'out_of_stock') filter.quantity_in_stock = 0;
  else if (stock_status === 'low_stock') filter.quantity_in_stock = { $gt: 0, $lt: 10 };
  else if (stock_status === 'in_stock') filter.quantity_in_stock = { $gte: 10 };

  const sortObj = { [sort]: order === 'asc' ? 1 : -1 };

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate('category_id', 'name')
      .populate('supplier_id', 'name')
      .sort(sortObj)
      .skip(skip)
      .limit(pageSize)
      .lean({ virtuals: true }),
    Product.countDocuments(filter),
  ]);

  return sendSuccess(res, 200, 'Products retrieved', products, buildPaginationMeta(total, page, pageSize));
});
/**--------------------------------------------------------------- */

/**
 * @desc   Get single product by ID
 * @route  GET /api/products/:id
 * @access Private
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('category_id', 'name description')
    .populate('supplier_id', 'name contact_email phone')
    .lean({ virtuals: true });

  if (!product) return sendError(res, 404, 'Product not found');

  return sendSuccess(res, 200, 'Product retrieved', product);
});
/**--------------------------------------------------------------- */

/**
 * @desc   Create a new product
 * @route  POST /api/products
 * @access Private
 */
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  const populated = await product.populate([
    { path: 'category_id', select: 'name' },
    { path: 'supplier_id', select: 'name' },
  ]);

  return sendSuccess(res, 201, 'Product created successfully', populated);
});
/**--------------------------------------------------------------- */

/**
 * @desc   Update a product by ID
 * @route  PUT /api/products/:id
 * @access Private
 */
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('category_id', 'name')
    .populate('supplier_id', 'name')
    .lean({ virtuals: true });

  if (!product) return sendError(res, 404, 'Product not found');

  return sendSuccess(res, 200, 'Product updated successfully', product);
});
/**--------------------------------------------------------------- */

/**
 * @desc   Delete a product by ID
 * @route  DELETE /api/products/:id
 * @access Private (Admin only)
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return sendError(res, 404, 'Product not found');

  return sendSuccess(res, 200, 'Product deleted successfully', null);
});
/**--------------------------------------------------------------- */

/**
 * @desc   Export all products (with filters) as CSV
 * @route  GET /api/products/export
 * @access Private
 */
const exportProducts = asyncHandler(async (req, res) => {
  const { search, category_id, supplier_id, stock_status } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { sku: { $regex: search, $options: 'i' } },
    ];
  }
  if (category_id) filter.category_id = category_id;
  if (supplier_id) filter.supplier_id = supplier_id;
  if (stock_status === 'out_of_stock') filter.quantity_in_stock = 0;
  else if (stock_status === 'low_stock') filter.quantity_in_stock = { $gt: 0, $lt: 10 };
  else if (stock_status === 'in_stock') filter.quantity_in_stock = { $gte: 10 };

  const products = await Product.find(filter)
    .populate('category_id', 'name')
    .populate('supplier_id', 'name')
    .lean({ virtuals: true });

  const csv = await exportProductsToCSV(products);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
  return res.status(200).send(csv);
});
/**--------------------------------------------------------------- */

/**
 * @desc   Import products from CSV file
 * @route  POST /api/products/import
 * @access Private
 */
const importProducts = asyncHandler(async (req, res) => {
  if (!req.file) {
    return sendError(res, 400, 'Please upload a CSV file');
  }

  const result = await importProductsFromCSV(req.file.buffer);

  return sendSuccess(res, 200, 'CSV import completed', result);
});
/**--------------------------------------------------------------- */

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  exportProducts,
  importProducts,
};
