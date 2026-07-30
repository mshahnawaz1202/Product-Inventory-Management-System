const Supplier = require('../models/Supplier');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { getPaginationParams, buildPaginationMeta } = require('../utils/pagination');

/**
 * @desc   Get all suppliers with pagination and search
 * @route  GET /api/suppliers
 * @access Private
 */
const getAllSuppliers = asyncHandler(async (req, res) => {
  const { page, pageSize, skip } = getPaginationParams(req.query);
  const { search, sort = 'createdAt', order = 'desc' } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { contact_email: { $regex: search, $options: 'i' } },
      { address: { $regex: search, $options: 'i' } },
    ];
  }

  const sortObj = { [sort]: order === 'asc' ? 1 : -1 };

  const [suppliers, total] = await Promise.all([
    Supplier.find(filter).sort(sortObj).skip(skip).limit(pageSize).lean(),
    Supplier.countDocuments(filter),
  ]);

  const suppliersWithCount = await Promise.all(
    suppliers.map(async (sup) => {
      const productCount = await Product.countDocuments({ supplier_id: sup._id });
      return { ...sup, productCount };
    })
  );

  return sendSuccess(
    res, 200, 'Suppliers retrieved', suppliersWithCount,
    buildPaginationMeta(total, page, pageSize)
  );
});
/**--------------------------------------------------------------- */

/**
 * @desc   Get single supplier by ID
 * @route  GET /api/suppliers/:id
 * @access Private
 */
const getSupplierById = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id).lean();
  if (!supplier) return sendError(res, 404, 'Supplier not found');

  const productCount = await Product.countDocuments({ supplier_id: supplier._id });

  return sendSuccess(res, 200, 'Supplier retrieved', { ...supplier, productCount });
});
/**--------------------------------------------------------------- */

/**
 * @desc   Create a new supplier
 * @route  POST /api/suppliers
 * @access Private
 */
const createSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.create(req.body);
  return sendSuccess(res, 201, 'Supplier created successfully', supplier);
});
/**--------------------------------------------------------------- */

/**
 * @desc   Update a supplier by ID
 * @route  PUT /api/suppliers/:id
 * @access Private
 */
const updateSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).lean();

  if (!supplier) return sendError(res, 404, 'Supplier not found');

  return sendSuccess(res, 200, 'Supplier updated successfully', supplier);
});
/**--------------------------------------------------------------- */

/**
 * @desc   Delete a supplier by ID (blocked if products exist)
 * @route  DELETE /api/suppliers/:id
 * @access Private (Admin only)
 */
const deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) return sendError(res, 404, 'Supplier not found');

  const productCount = await Product.countDocuments({ supplier_id: req.params.id });
  if (productCount > 0) {
    return sendError(
      res, 409,
      `Cannot delete supplier. It has ${productCount} product(s) assigned to it.`
    );
  }

  await Supplier.findByIdAndDelete(req.params.id);
  return sendSuccess(res, 200, 'Supplier deleted successfully', null);
});
/**--------------------------------------------------------------- */

module.exports = { getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier };
