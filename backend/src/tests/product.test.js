const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

describe('Product API', () => {
  let adminToken;
  let staffToken;
  let categoryId;
  let supplierId;
  let productId;

  const adminUser = { name: 'Product Test Admin', email: 'prodadmin@test.com', password: 'pass1234', role: 'admin' };
  const staffUser = { name: 'Product Test Staff', email: 'prodstaff@test.com', password: 'pass1234', role: 'staff' };

  beforeAll(async () => {
    await User.deleteMany({ email: { $in: [adminUser.email, staffUser.email] } });
    await Category.deleteMany({ name: 'Test Category Prod' });
    await Supplier.deleteMany({ contact_email: 'testsup@prod.com' });

    const adminRes = await request(app).post('/api/auth/register').send(adminUser);
    adminToken = adminRes.body.data.token;

    const staffRes = await request(app).post('/api/auth/register').send(staffUser);
    staffToken = staffRes.body.data.token;

    const cat = await Category.create({ name: 'Test Category Prod', description: 'test' });
    categoryId = cat._id.toString();

    const sup = await Supplier.create({ name: 'Test Supplier Prod', contact_email: 'testsup@prod.com', phone: '1234567890' });
    supplierId = sup._id.toString();
  });

  afterAll(async () => {
    await User.deleteMany({ email: { $in: [adminUser.email, staffUser.email] } });
    await Category.deleteMany({ name: 'Test Category Prod' });
    await Supplier.deleteMany({ contact_email: 'testsup@prod.com' });
    await Product.deleteMany({ sku: { $in: ['TEST-SKU-001', 'TEST-SKU-002'] } });
  });

  /**--------------------------------------------------------------- */

  describe('POST /api/products', () => {
    it('should create a product', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test Product One',
          sku: 'TEST-SKU-001',
          unit_price: 99.99,
          quantity_in_stock: 50,
          category_id: categoryId,
          supplier_id: supplierId,
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.sku).toBe('TEST-SKU-001');
      productId = res.body.data._id;
    });

    it('should return 409 for duplicate SKU', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Duplicate SKU Product',
          sku: 'TEST-SKU-001',
          unit_price: 50,
          quantity_in_stock: 10,
          category_id: categoryId,
          supplier_id: supplierId,
        });
      expect(res.statusCode).toBe(409);
    });

    it('should return 422 for negative price', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Bad Product',
          sku: 'TEST-SKU-BAD',
          unit_price: -10,
          category_id: categoryId,
          supplier_id: supplierId,
        });
      expect(res.statusCode).toBe(422);
    });

    it('should return 401 without token', async () => {
      const res = await request(app).post('/api/products').send({});
      expect(res.statusCode).toBe(401);
    });
  });

  /**--------------------------------------------------------------- */

  describe('GET /api/products', () => {
    it('should return paginated products', async () => {
      const res = await request(app)
        .get('/api/products')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('pagination');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should filter by stock_status', async () => {
      const res = await request(app)
        .get('/api/products?stock_status=in_stock')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
    });

    it('should search by name', async () => {
      const res = await request(app)
        .get('/api/products?search=Test Product')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  /**--------------------------------------------------------------- */

  describe('PUT /api/products/:id', () => {
    it('should update a product', async () => {
      const res = await request(app)
        .put(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ unit_price: 149.99 });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.unit_price).toBe(149.99);
    });
  });

  /**--------------------------------------------------------------- */

  describe('DELETE /api/products/:id', () => {
    it('should prevent staff from deleting', async () => {
      const res = await request(app)
        .delete(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${staffToken}`);
      expect(res.statusCode).toBe(403);
    });

    it('should allow admin to delete', async () => {
      const res = await request(app)
        .delete(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
