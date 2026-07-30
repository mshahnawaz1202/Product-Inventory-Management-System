const Category = require('../models/Category');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { getPaginationParams, buildPaginationMeta } = require('../utils/pagination');

/**
 * @desc   Get all categories with pagination and search
 * @route  GET /api/categories
 * @access Private
 */
const getAllCategories = asyncHandler(async (req, res) => {
  const { page, pageSize, skip } = getPaginationParams(req.query);
  const { search, sort = 'createdAt', order = 'desc' } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const sortObj = { [sort]: order === 'asc' ? 1 : -1 };

  const [categories, total] = await Promise.all([
    Category.find(filter).sort(sortObj).skip(skip).limit(pageSize).lean(),
    Category.countDocuments(filter),
  ]);

  // Attach product count to each category
  const categoriesWithCount = await Promise.all(
    categories.map(async (cat) => {
      const productCount = await Product.countDocuments({ category_id: cat._id });
      return { ...cat, productCount };
    })
  );

  return sendSuccess(
    res, 200, 'Categories retrieved', categoriesWithCount,
    buildPaginationMeta(total, page, pageSize)
  );
});
/**--------------------------------------------------------------- */

/**
 * @desc   Get single category by ID
 * @route  GET /api/categories/:id
 * @access Private
 */
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).lean();
  if (!category) return sendError(res, 404, 'Category not found');

  const productCount = await Product.countDocuments({ category_id: category._id });

  return sendSuccess(res, 200, 'Category retrieved', { ...category, productCount });
});
/**--------------------------------------------------------------- */

/**
 * @desc   Create a new category
 * @route  POST /api/categories
 * @access Private
 */
const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  return sendSuccess(res, 201, 'Category created successfully', category);
});
/**--------------------------------------------------------------- */

/**
 * @desc   Update a category by ID
 * @route  PUT /api/categories/:id
 * @access Private
 */
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).lean();

  if (!category) return sendError(res, 404, 'Category not found');

  return sendSuccess(res, 200, 'Category updated successfully', category);
});
/**--------------------------------------------------------------- */

/**
 * @desc   Delete a category by ID (blocked if products exist)
 * @route  DELETE /api/categories/:id
 * @access Private (Admin only)
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return sendError(res, 404, 'Category not found');

  const productCount = await Product.countDocuments({ category_id: req.params.id });
  if (productCount > 0) {
    return sendError(
      res, 409,
      `Cannot delete category. It has ${productCount} product(s) assigned to it.`
    );
  }

  await Category.findByIdAndDelete(req.params.id);
  return sendSuccess(res, 200, 'Category deleted successfully', null);
});
/**--------------------------------------------------------------- */

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
