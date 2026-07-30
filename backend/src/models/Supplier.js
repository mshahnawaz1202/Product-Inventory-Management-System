const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Supplier name is required'],
      trim: true,
      minlength: [2, 'Supplier name must be at least 2 characters'],
      maxlength: [150, 'Supplier name cannot exceed 150 characters'],
    },
    contact_email: {
      type: String,
      required: [true, 'Contact email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[\d\s\-+().]{7,20}$/, 'Please provide a valid phone number'],
    },
    address: {
      type: String,
      trim: true,
      maxlength: [300, 'Address cannot exceed 300 characters'],
    },
  },
  {
    timestamps: true,
  }
);

supplierSchema.index({ name: 1 });
supplierSchema.index({ contact_email: 1 });

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
