const mongoose = require('mongoose');
const Product = require('../models/Product');
const StockMovement = require('../models/StockMovement');

/**
 * Creates a stock movement and updates product quantity atomically
 * using a MongoDB session/transaction.
 *
 * @param {object} params
 * @param {string} params.product_id - Product ObjectId
 * @param {string} params.type - 'IN' or 'OUT'
 * @param {number} params.quantity - Quantity to move
 * @param {string} [params.reason] - Optional reason
 * @param {string} [params.user_id] - User performing the action
 * @returns {Promise<{ movement: object, product: object }>}
 */
const createStockMovement = async ({ product_id, type, quantity, reason = '', user_id = null }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const product = await Product.findById(product_id).session(session);

    if (!product) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      throw err;
    }

    const previous_stock = product.quantity_in_stock;

    if (type === 'OUT') {
      if (quantity > previous_stock) {
        const err = new Error(
          `Insufficient stock. Available: ${previous_stock}, Requested: ${quantity}`
        );
        err.statusCode = 400;
        throw err;
      }
    }

    const new_stock = type === 'IN' ? previous_stock + quantity : previous_stock - quantity;

    // Update product stock
    product.quantity_in_stock = new_stock;
    await product.save({ session });

    // Create movement record
    const [movement] = await StockMovement.create(
      [{ product_id, type, quantity, previous_stock, new_stock, reason, user_id }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return { movement, product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
/**--------------------------------------------------------------- */

/**
 * Get stock movement summary for a product.
 * @param {string} product_id
 * @returns {Promise<object>}
 */
const getProductStockSummary = async (product_id) => {
  const result = await StockMovement.aggregate([
    { $match: { product_id: new mongoose.Types.ObjectId(product_id) } },
    {
      $group: {
        _id: '$type',
        totalQuantity: { $sum: '$quantity' },
        count: { $sum: 1 },
      },
    },
  ]);

  const summary = { totalIN: 0, totalOUT: 0, inCount: 0, outCount: 0 };
  result.forEach((r) => {
    if (r._id === 'IN') {
      summary.totalIN = r.totalQuantity;
      summary.inCount = r.count;
    } else if (r._id === 'OUT') {
      summary.totalOUT = r.totalQuantity;
      summary.outCount = r.count;
    }
  });

  return summary;
};
/**--------------------------------------------------------------- */

module.exports = { createStockMovement, getProductStockSummary };
