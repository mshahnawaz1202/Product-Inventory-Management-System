const Joi = require('joi');

const createStockMovementSchema = {
  body: Joi.object({
    product_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid product ID',
        'any.required': 'Product is required',
      }),
    type: Joi.string().valid('IN', 'OUT').required().messages({
      'any.only': 'Movement type must be IN or OUT',
      'any.required': 'Movement type is required',
    }),
    quantity: Joi.number().integer().min(1).required().messages({
      'number.min': 'Quantity must be at least 1',
      'number.integer': 'Quantity must be a whole number',
      'any.required': 'Quantity is required',
    }),
    reason: Joi.string().max(500).allow('', null).optional(),
  }),
};
/**--------------------------------------------------------------- */

const stockMovementQuerySchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().min(1).max(100).default(10),
    product_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('', null).optional(),
    type: Joi.string().valid('IN', 'OUT').allow('', null).optional(),
    from: Joi.string().allow('', null).optional(),
    to: Joi.string().allow('', null).optional(),
    sort: Joi.string().valid('createdAt', 'quantity').default('createdAt'),
    order: Joi.string().valid('asc', 'desc').default('desc'),
  }),
};
/**--------------------------------------------------------------- */

module.exports = { createStockMovementSchema, stockMovementQuerySchema };
