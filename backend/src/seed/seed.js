require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');
const StockMovement = require('../models/StockMovement');

const seed = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to database for seeding...');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Supplier.deleteMany({}),
      Product.deleteMany({}),
      StockMovement.deleteMany({}),
    ]);
    console.log('Existing data cleared.');

    // Create users using User.create so pre('save') hashes passwords properly
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@inventory.com',
      password: 'admin123',
      role: 'admin',
    });

    const staffUser = await User.create({
      name: 'Staff User',
      email: 'staff@inventory.com',
      password: 'staff123',
      role: 'staff',
    });

    const users = [adminUser, staffUser];
    console.log('Users seeded.');

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Electronics', description: 'Electronic devices and accessories' },
      { name: 'Office Supplies', description: 'Stationery and office equipment' },
      { name: 'Furniture', description: 'Office and home furniture items' },
    ]);
    console.log('Categories seeded.');

    // Create suppliers
    const suppliers = await Supplier.insertMany([
      { name: 'TechWorld Distributors', contact_email: 'sales@techworld.com', phone: '+1-555-100-2000', address: '123 Silicon Ave, San Francisco, CA 94102' },
      { name: 'OfficeMax Wholesale', contact_email: 'orders@officemax.com', phone: '+1-555-200-3000', address: '456 Commerce Blvd, Chicago, IL 60601' },
      { name: 'FurniCraft Supplies', contact_email: 'supply@furnicraft.com', phone: '+1-555-300-4000', address: '789 Industrial Rd, Dallas, TX 75201' },
    ]);
    console.log('Suppliers seeded.');

    // Create 20 products
    const productsData = [
      { name: 'Dell XPS 15 Laptop', sku: 'DELL-XPS-15', description: '15.6" 4K OLED display, Intel Core i9, 32GB RAM', unit_price: 2499.99, quantity_in_stock: 25, category_id: categories[0]._id, supplier_id: suppliers[0]._id },
      { name: 'Apple MacBook Pro 14"', sku: 'APPLE-MBP-14', description: 'M3 Pro chip, 18GB RAM, 512GB SSD', unit_price: 1999.99, quantity_in_stock: 15, category_id: categories[0]._id, supplier_id: suppliers[0]._id },
      { name: 'Samsung 27" 4K Monitor', sku: 'SAM-MON-27-4K', description: '4K UHD IPS display, 60Hz, USB-C', unit_price: 549.99, quantity_in_stock: 40, category_id: categories[0]._id, supplier_id: suppliers[0]._id },
      { name: 'Logitech MX Master 3', sku: 'LOG-MX-MASTER3', description: 'Wireless ergonomic mouse, multi-device', unit_price: 99.99, quantity_in_stock: 8, category_id: categories[0]._id, supplier_id: suppliers[0]._id },
      { name: 'Mechanical Keyboard TKL', sku: 'KB-MECH-TKL-BLK', description: 'Tenkeyless mechanical keyboard, Cherry MX switches', unit_price: 149.99, quantity_in_stock: 0, category_id: categories[0]._id, supplier_id: suppliers[0]._id },
      { name: 'USB-C Docking Station', sku: 'DOCK-USBC-12PORT', description: '12-in-1 USB-C hub with HDMI, ethernet, and PD', unit_price: 89.99, quantity_in_stock: 60, category_id: categories[0]._id, supplier_id: suppliers[0]._id },
      { name: 'Bose QuietComfort 45', sku: 'BOSE-QC45-BLK', description: 'Noise-cancelling wireless headphones', unit_price: 329.99, quantity_in_stock: 5, category_id: categories[0]._id, supplier_id: suppliers[0]._id },
      { name: 'Premium A4 Paper (500 sheets)', sku: 'PAPER-A4-500', description: '80gsm premium white office paper', unit_price: 12.99, quantity_in_stock: 200, category_id: categories[1]._id, supplier_id: suppliers[1]._id },
      { name: 'Black Gel Pens (12-pack)', sku: 'PEN-GEL-BLK-12', description: '0.7mm smooth gel ink pens', unit_price: 8.99, quantity_in_stock: 150, category_id: categories[1]._id, supplier_id: suppliers[1]._id },
      { name: 'Stapler Heavy Duty', sku: 'STPL-HD-25SH', description: 'Staples up to 25 sheets, jam-resistant', unit_price: 24.99, quantity_in_stock: 35, category_id: categories[1]._id, supplier_id: suppliers[1]._id },
      { name: 'Whiteboard 4x3 ft', sku: 'WB-4X3-MAG', description: 'Magnetic dry-erase whiteboard with eraser and markers', unit_price: 79.99, quantity_in_stock: 12, category_id: categories[1]._id, supplier_id: suppliers[1]._id },
      { name: 'Label Maker LM-280', sku: 'LBL-MAKER-280', description: 'Handheld label printer with QWERTY keyboard', unit_price: 39.99, quantity_in_stock: 0, category_id: categories[1]._id, supplier_id: suppliers[1]._id },
      { name: 'Filing Cabinet 4-Drawer', sku: 'FILE-CAB-4DR-GREY', description: 'Steel lateral filing cabinet, lockable', unit_price: 299.99, quantity_in_stock: 6, category_id: categories[1]._id, supplier_id: suppliers[1]._id },
      { name: 'Ergonomic Office Chair', sku: 'CHAIR-ERG-MESH', description: 'Mesh back, lumbar support, adjustable armrests', unit_price: 399.99, quantity_in_stock: 18, category_id: categories[2]._id, supplier_id: suppliers[2]._id },
      { name: 'Standing Desk 60"', sku: 'DESK-STAND-60-WHT', description: 'Electric height-adjustable desk, white frame', unit_price: 649.99, quantity_in_stock: 9, category_id: categories[2]._id, supplier_id: suppliers[2]._id },
      { name: 'Bookshelf 5-Tier', sku: 'SHELF-5TIER-OAK', description: 'Solid wood bookshelf, oak finish', unit_price: 189.99, quantity_in_stock: 14, category_id: categories[2]._id, supplier_id: suppliers[2]._id },
      { name: 'Conference Table 10-Seat', sku: 'TABLE-CONF-10S', description: 'Modern conference table with cable management', unit_price: 1299.99, quantity_in_stock: 3, category_id: categories[2]._id, supplier_id: suppliers[2]._id },
      { name: 'Monitor Stand Dual', sku: 'STAND-MON-DUAL', description: 'Dual monitor arm mount, adjustable height and tilt', unit_price: 69.99, quantity_in_stock: 30, category_id: categories[2]._id, supplier_id: suppliers[2]._id },
      { name: 'Webcam 4K Pro', sku: 'CAM-4K-PRO-USB', description: '4K 30fps webcam with AI autofocus and noise reduction', unit_price: 199.99, quantity_in_stock: 22, category_id: categories[0]._id, supplier_id: suppliers[0]._id },
      { name: 'Portable SSD 1TB', sku: 'SSD-PORT-1TB-BLK', description: 'USB 3.2 Gen2 portable SSD, 1050MB/s read', unit_price: 119.99, quantity_in_stock: 45, category_id: categories[0]._id, supplier_id: suppliers[0]._id },
    ];

    const products = await Product.insertMany(productsData);
    console.log(`${products.length} products seeded.`);

    // Create sample stock movements
    const movementsData = [
      { product_id: products[0]._id, type: 'IN', quantity: 50, previous_stock: 0, new_stock: 50, reason: 'Initial stock', user_id: users[0]._id },
      { product_id: products[0]._id, type: 'OUT', quantity: 25, previous_stock: 50, new_stock: 25, reason: 'Sales order #001', user_id: users[1]._id },
      { product_id: products[1]._id, type: 'IN', quantity: 30, previous_stock: 0, new_stock: 30, reason: 'Initial stock', user_id: users[0]._id },
      { product_id: products[1]._id, type: 'OUT', quantity: 15, previous_stock: 30, new_stock: 15, reason: 'Sales order #002', user_id: users[1]._id },
      { product_id: products[7]._id, type: 'IN', quantity: 200, previous_stock: 0, new_stock: 200, reason: 'Quarterly restock', user_id: users[0]._id },
    ];

    await StockMovement.insertMany(movementsData);
    console.log('Sample stock movements seeded.');

    console.log('\n--- Seed completed successfully ---');
    console.log('Admin: admin@inventory.com / admin123');
    console.log('Staff: staff@inventory.com / staff123');
    console.log('-----------------------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
