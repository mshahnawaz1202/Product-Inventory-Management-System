/**
 * Pagination utility for consistent server-side pagination.
 * Extracts and validates page/pageSize from query params.
 */

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

/**
 * Parse pagination params from request query.
 * @param {object} query - req.query object
 * @returns {{ page: number, pageSize: number, skip: number }}
 */
const getPaginationParams = (query) => {
  let page = parseInt(query.page, 10) || DEFAULT_PAGE;
  let pageSize = parseInt(query.pageSize || query.limit, 10) || DEFAULT_PAGE_SIZE;

  if (page < 1) page = DEFAULT_PAGE;
  if (pageSize < 1) pageSize = DEFAULT_PAGE_SIZE;
  if (pageSize > MAX_PAGE_SIZE) pageSize = MAX_PAGE_SIZE;

  const skip = (page - 1) * pageSize;

  return { page, pageSize, skip };
};
/**--------------------------------------------------------------- */

/**
 * Build pagination metadata for response.
 * @param {number} total - Total count of matching documents
 * @param {number} page - Current page
 * @param {number} pageSize - Items per page
 * @returns {object} Pagination metadata
 */
const buildPaginationMeta = (total, page, pageSize) => ({
  pagination: {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    hasNextPage: page < Math.ceil(total / pageSize),
    hasPrevPage: page > 1,
  },
});
/**--------------------------------------------------------------- */

module.exports = { getPaginationParams, buildPaginationMeta };
