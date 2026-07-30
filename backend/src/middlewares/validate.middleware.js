/**
 * Joi validation middleware factory.
 * Validates request body, query params, or route params against a Joi schema.
 *
 * @param {object} schema - Joi schema object with optional body/query/params keys
 * @returns {Function} Express middleware
 */
const validate = (schema) => (req, res, next) => {
  const validationErrors = [];

  if (schema.body) {
    const { error } = schema.body.validate(req.body, { abortEarly: false });
    if (error) {
      validationErrors.push(...error.details.map((d) => d.message));
    }
  }

  if (schema.query) {
    const { error } = schema.query.validate(req.query, { abortEarly: false });
    if (error) {
      validationErrors.push(...error.details.map((d) => d.message));
    }
  }

  if (schema.params) {
    const { error } = schema.params.validate(req.params, { abortEarly: false });
    if (error) {
      validationErrors.push(...error.details.map((d) => d.message));
    }
  }

  if (validationErrors.length > 0) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: validationErrors,
    });
  }

  return next();
};

module.exports = validate;
