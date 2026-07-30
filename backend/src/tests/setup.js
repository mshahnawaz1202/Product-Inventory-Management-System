require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.DATABASE_URL);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
