const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [2, 'Product name must be at least 2 characters'],
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z0-9\-_]{2,50}$/, 'SKU must be alphanumeric (2–50 chars, dashes/underscores allowed)'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },
    unit_price: {
      type: Number,
      required: [true, 'Unit price is required'],
      min: [0, 'Unit price cannot be negative'],
    },
    quantity_in_stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Quantity in stock cannot be negative'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be a whole number',
      },
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    supplier_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: [true, 'Supplier is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for search performance
productSchema.index({ name: 'text', sku: 'text', description: 'text' });
productSchema.index({ category_id: 1 });
productSchema.index({ supplier_id: 1 });
productSchema.index({ quantity_in_stock: 1 });
productSchema.index({ unit_price: 1 });
productSchema.index({ sku: 1 }, { unique: true });

// Virtual for stock status
productSchema.virtual('stock_status').get(function () {
  if (this.quantity_in_stock === 0) return 'out_of_stock';
  if (this.quantity_in_stock < 10) return 'low_stock';
  return 'in_stock';
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
