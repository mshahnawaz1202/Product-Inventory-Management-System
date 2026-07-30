const mongoose = require('mongoose');

const stockMovementSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required'],
    },
    type: {
      type: String,
      enum: {
        values: ['IN', 'OUT'],
        message: 'Movement type must be either IN or OUT',
      },
      required: [true, 'Movement type is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be a whole number',
      },
    },
    previous_stock: {
      type: Number,
      required: true,
      min: [0, 'Previous stock cannot be negative'],
    },
    new_stock: {
      type: Number,
      required: true,
      min: [0, 'New stock cannot be negative'],
    },
    reason: {
      type: String,
      trim: true,
      maxlength: [500, 'Reason cannot exceed 500 characters'],
      default: '',
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

stockMovementSchema.index({ product_id: 1 });
stockMovementSchema.index({ type: 1 });
stockMovementSchema.index({ createdAt: -1 });
stockMovementSchema.index({ user_id: 1 });

const StockMovement = mongoose.model('StockMovement', stockMovementSchema);

module.exports = StockMovement;
