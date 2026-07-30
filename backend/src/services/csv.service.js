const csvParser = require('csv-parser');
const { Readable } = require('stream');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');

/**
 * Export products to CSV format.
 * @param {object[]} products - Array of populated product documents
 * @returns {Promise<string>} CSV string
 */
const exportProductsToCSV = (products) => {
  return new Promise((resolve) => {
    const headers = ['name', 'sku', 'description', 'unit_price', 'quantity_in_stock', 'category', 'supplier', 'stock_status', 'createdAt'];
    const lines = [headers.join(',')];

    for (const p of products) {
      const escape = (val) => `"${String(val || '').replace(/"/g, '""')}"`;
      const row = [
        escape(p.name),
        escape(p.sku),
        escape(p.description),
        p.unit_price || 0,
        p.quantity_in_stock || 0,
        escape(p.category_id?.name),
        escape(p.supplier_id?.name),
        escape(p.stock_status),
        escape(p.createdAt ? new Date(p.createdAt).toISOString() : ''),
      ];
      lines.push(row.join(','));
    }

    resolve(lines.join('\r\n'));
  });
};
/**--------------------------------------------------------------- */

/**
 * Import products from CSV buffer.
 * Validates each row, detects duplicates, and reports errors.
 *
 * @param {Buffer} buffer - CSV file buffer
 * @returns {Promise<{ imported: number, skipped: number, errors: string[] }>}
 */
const importProductsFromCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    const rows = [];
    const readable = Readable.from(buffer.toString());

    readable
      .pipe(csvParser({ mapHeaders: ({ header }) => header.trim().toLowerCase() }))
      .on('data', (row) => rows.push(row))
      .on('error', reject)
      .on('end', async () => {
        const result = { imported: 0, skipped: 0, errors: [] };

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const rowNum = i + 2; // Account for header row

          try {
            // Extract fields regardless of spacing
            const name = row.name?.trim();
            const sku = row.sku?.trim()?.toUpperCase();
            const unit_price = row.unit_price?.trim();
            const categoryName = row.category?.trim();
            const supplierName = row.supplier?.trim();
            const description = row.description?.trim() || '';
            const quantity_in_stock = row.quantity_in_stock?.trim() || '0';

            // Validate required fields
            if (!name || !sku || !unit_price || !categoryName || !supplierName) {
              result.errors.push(`Row ${rowNum}: Missing required fields (name, sku, unit_price, category, supplier)`);
              result.skipped++;
              continue;
            }

            // Check duplicate SKU
            const existingProduct = await Product.findOne({ sku });
            if (existingProduct) {
              result.errors.push(`Row ${rowNum}: SKU '${sku}' already exists — skipped`);
              result.skipped++;
              continue;
            }

            // Find category/supplier
            const category = await Category.findOne({ name: { $regex: new RegExp(`^${categoryName}$`, 'i') } });
            if (!category) {
              result.errors.push(`Row ${rowNum}: Category '${categoryName}' not found — skipped`);
              result.skipped++;
              continue;
            }

            const supplier = await Supplier.findOne({ name: { $regex: new RegExp(`^${supplierName}$`, 'i') } });
            if (!supplier) {
              result.errors.push(`Row ${rowNum}: Supplier '${supplierName}' not found — skipped`);
              result.skipped++;
              continue;
            }

            const price = parseFloat(unit_price);
            const qty = parseInt(quantity_in_stock, 10) || 0;

            if (isNaN(price) || price < 0) {
              result.errors.push(`Row ${rowNum}: Invalid unit_price '${unit_price}' — skipped`);
              result.skipped++;
              continue;
            }

            if (qty < 0) {
              result.errors.push(`Row ${rowNum}: quantity_in_stock cannot be negative — skipped`);
              result.skipped++;
              continue;
            }

            await Product.create({
              name,
              sku,
              description,
              unit_price: price,
              quantity_in_stock: qty,
              category_id: category._id,
              supplier_id: supplier._id,
            });

            result.imported++;
          } catch (err) {
            result.errors.push(`Row ${rowNum}: ${err.message}`);
            result.skipped++;
          }
        }

        resolve(result);
      });
  });
};
/**--------------------------------------------------------------- */

module.exports = { exportProductsToCSV, importProductsFromCSV };
