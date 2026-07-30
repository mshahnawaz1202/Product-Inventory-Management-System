const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

describe('Category API', () => {
  let adminToken;
  let categoryId;
  const testEmail = 'catadmin@test.com';

  beforeAll(async () => {
    await User.deleteMany({ email: testEmail });
    await Category.deleteMany({ name: { $in: ['Test Electronics', 'Test Furniture'] } });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Cat Admin', email: testEmail, password: 'pass1234', role: 'admin' });
    adminToken = res.body.data.token;
  });

  afterAll(async () => {
    await User.deleteMany({ email: testEmail });
    await Category.deleteMany({ name: { $in: ['Test Electronics', 'Test Furniture'] } });
  });

  /**--------------------------------------------------------------- */

  describe('POST /api/categories', () => {
    it('should create a new category', async () => {
      const res = await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Test Electronics', description: 'Test category description' });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.name).toBe('Test Electronics');
      categoryId = res.body.data._id;
    });

    it('should return 409 for duplicate name', async () => {
      const res = await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Test Electronics' });
      expect(res.statusCode).toBe(409);
    });

    it('should return 422 if name too short', async () => {
      const res = await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'A' });
      expect(res.statusCode).toBe(422);
    });
  });

  /**--------------------------------------------------------------- */

  describe('GET /api/categories', () => {
    it('should return paginated categories', async () => {
      const res = await request(app)
        .get('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('pagination');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should search categories by name', async () => {
      const res = await request(app)
        .get('/api/categories?search=Test Electronics')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  /**--------------------------------------------------------------- */

  describe('DELETE /api/categories/:id (cascade protection)', () => {
    it('should block deletion if products are assigned', async () => {
      // Create a supplier and product using this category
      const sup = await Supplier.create({ name: 'Cascade Test Sup', contact_email: 'cascsup@test.com' });
      await Product.create({
        name: 'Cascade Product',
        sku: 'CASC-PROD-001',
        unit_price: 10,
        category_id: categoryId,
        supplier_id: sup._id,
      });

      const res = await request(app)
        .delete(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(409);

      await Product.deleteMany({ sku: 'CASC-PROD-001' });
      await Supplier.deleteMany({ contact_email: 'cascsup@test.com' });
    });

    it('should delete category when no products assigned', async () => {
      const cat = await Category.create({ name: 'Test Furniture', description: 'temp' });
      const res = await request(app)
        .delete(`/api/categories/${cat._id}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
