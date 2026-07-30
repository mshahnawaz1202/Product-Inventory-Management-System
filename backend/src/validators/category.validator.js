const Joi = require('joi');

const createCategorySchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.min': 'Category name must be at least 2 characters',
      'any.required': 'Category name is required',
    }),
    description: Joi.string().max(500).allow('').optional(),
  }),
};
/**--------------------------------------------------------------- */

const updateCategorySchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    description: Joi.string().max(500).allow('').optional(),
  }).min(1).messages({ 'object.min': 'At least one field is required for update' }),
};
/**--------------------------------------------------------------- */

const categoryQuerySchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().max(100).allow('').optional(),
    sort: Joi.string().valid('name', 'createdAt').default('createdAt'),
    order: Joi.string().valid('asc', 'desc').default('desc'),
  }),
};
/**--------------------------------------------------------------- */

module.exports = { createCategorySchema, updateCategorySchema, categoryQuerySchema };
