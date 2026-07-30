const Joi = require('joi');

const createProductSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(200).required().messages({
      'string.min': 'Product name must be at least 2 characters',
      'any.required': 'Product name is required',
    }),
    sku: Joi.string()
      .pattern(/^[A-Z0-9\-_]{2,50}$/i)
      .required()
      .messages({
        'string.pattern.base': 'SKU must be alphanumeric (2-50 chars, dashes/underscores allowed)',
        'any.required': 'SKU is required',
      }),
    description: Joi.string().max(1000).allow('').optional(),
    unit_price: Joi.number().min(0).required().messages({
      'number.min': 'Unit price cannot be negative',
      'any.required': 'Unit price is required',
    }),
    quantity_in_stock: Joi.number().integer().min(0).default(0).messages({
      'number.min': 'Quantity cannot be negative',
      'number.integer': 'Quantity must be a whole number',
    }),
    category_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid category ID',
        'any.required': 'Category is required',
      }),
    supplier_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid supplier ID',
        'any.required': 'Supplier is required',
      }),
  }),
};
/**--------------------------------------------------------------- */

const updateProductSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(200).optional(),
    sku: Joi.string()
      .pattern(/^[A-Z0-9\-_]{2,50}$/i)
      .optional(),
    description: Joi.string().max(1000).allow('').optional(),
    unit_price: Joi.number().min(0).optional(),
    quantity_in_stock: Joi.number().integer().min(0).optional(),
    category_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional(),
    supplier_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional(),
  }).min(1).messages({ 'object.min': 'At least one field is required for update' }),
};
/**--------------------------------------------------------------- */

const productQuerySchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().max(100).allow('').optional(),
    category_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').optional(),
    supplier_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').optional(),
    stock_status: Joi.string().valid('in_stock', 'low_stock', 'out_of_stock').allow('').optional(),
    sort: Joi.string().valid('name', 'sku', 'unit_price', 'quantity_in_stock', 'createdAt').default('createdAt'),
    order: Joi.string().valid('asc', 'desc').default('desc'),
  }),
};
/**--------------------------------------------------------------- */

module.exports = { createProductSchema, updateProductSchema, productQuerySchema };
