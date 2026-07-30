const Joi = require('joi');

const createSupplierSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(150).required().messages({
      'string.min': 'Supplier name must be at least 2 characters',
      'any.required': 'Supplier name is required',
    }),
    contact_email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Contact email is required',
    }),
    phone: Joi.string()
      .pattern(/^[\d\s\-+().]{7,20}$/)
      .allow('')
      .optional()
      .messages({ 'string.pattern.base': 'Please provide a valid phone number' }),
    address: Joi.string().max(300).allow('').optional(),
  }),
};
/**--------------------------------------------------------------- */

const updateSupplierSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(150).optional(),
    contact_email: Joi.string().email().optional(),
    phone: Joi.string()
      .pattern(/^[\d\s\-+().]{7,20}$/)
      .allow('')
      .optional(),
    address: Joi.string().max(300).allow('').optional(),
  }).min(1).messages({ 'object.min': 'At least one field is required for update' }),
};
/**--------------------------------------------------------------- */

const supplierQuerySchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().max(100).allow('').optional(),
    sort: Joi.string().valid('name', 'contact_email', 'createdAt').default('createdAt'),
    order: Joi.string().valid('asc', 'desc').default('desc'),
  }),
};
/**--------------------------------------------------------------- */

module.exports = { createSupplierSchema, updateSupplierSchema, supplierQuerySchema };
