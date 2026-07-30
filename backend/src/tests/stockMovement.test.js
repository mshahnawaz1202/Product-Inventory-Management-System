const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');
const StockMovement = require('../models/StockMovement');

describe('Stock Movement API', () => {
  let adminToken;
  let productId;

  const adminUser = { name: 'Stock Admin', email: 'stockadmin@test.com', password: 'pass1234', role: 'admin' };

  beforeAll(async () => {
    await User.deleteMany({ email: adminUser.email });

    const res = await request(app).post('/api/auth/register').send(adminUser);
    adminToken = res.body.data.token;

    const cat = await Category.create({ name: 'Stock Test Cat', description: 'test' });
    const sup = await Supplier.create({ name: 'Stock Test Sup', contact_email: 'stocksup@test.com' });
    const prod = await Product.create({
      name: 'Stock Test Product',
      sku: 'STOCK-TEST-001',
      unit_price: 10,
      quantity_in_stock: 100,
      category_id: cat._id,
      supplier_id: sup._id,
    });
    productId = prod._id.toString();
  });

  afterAll(async () => {
    await User.deleteMany({ email: adminUser.email });
    await Product.deleteMany({ sku: 'STOCK-TEST-001' });
    await Category.deleteMany({ name: 'Stock Test Cat' });
    await Supplier.deleteMany({ contact_email: 'stocksup@test.com' });
    await StockMovement.deleteMany({ product_id: productId });
  });

  /**--------------------------------------------------------------- */

  describe('POST /api/stock-movements', () => {
    it('should record an IN movement and update stock', async () => {
      const res = await request(app)
        .post('/api/stock-movements')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product_id: productId, type: 'IN', quantity: 50, reason: 'Restock' });

      expect(res.statusCode).toBe(201);
      expect(res.body.data.movement.type).toBe('IN');
      expect(res.body.data.movement.quantity).toBe(50);
      expect(res.body.data.product.quantity_in_stock).toBe(150);
    });

    it('should record an OUT movement and update stock', async () => {
      const res = await request(app)
        .post('/api/stock-movements')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product_id: productId, type: 'OUT', quantity: 30, reason: 'Sales' });

      expect(res.statusCode).toBe(201);
      expect(res.body.data.product.quantity_in_stock).toBe(120);
    });

    it('should reject OUT movement larger than stock', async () => {
      const res = await request(app)
        .post('/api/stock-movements')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product_id: productId, type: 'OUT', quantity: 99999, reason: 'Overstock attempt' });

      expect(res.statusCode).toBe(400);
    });

    it('should return 422 for zero quantity', async () => {
      const res = await request(app)
        .post('/api/stock-movements')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product_id: productId, type: 'IN', quantity: 0 });
      expect(res.statusCode).toBe(422);
    });

    it('should return 422 for invalid type', async () => {
      const res = await request(app)
        .post('/api/stock-movements')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product_id: productId, type: 'TRANSFER', quantity: 10 });
      expect(res.statusCode).toBe(422);
    });
  });

  /**--------------------------------------------------------------- */

  describe('GET /api/stock-movements', () => {
    it('should return paginated movements', async () => {
      const res = await request(app)
        .get('/api/stock-movements')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body).toHaveProperty('pagination');
    });

    it('should filter by type', async () => {
      const res = await request(app)
        .get('/api/stock-movements?type=IN')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      res.body.data.forEach((m) => expect(m.type).toBe('IN'));
    });

    it('should filter by product_id', async () => {
      const res = await request(app)
        .get(`/api/stock-movements?product_id=${productId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
