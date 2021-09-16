const sequelize = require('../config/connection');
const { Category, Product, ProductTag, Tag } = require('../models');

const CategorySeedData = require('./CategorySeedData.json');
const ProductSeedData = require('./ProductSeedData.json');
const ProductTagSeedData = require('./ProductTagSeedData.json');
const TagSeedData = require('./TagSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  console.log("\n----- DATABASE SYNCED -----\n");
  await Category.bulkCreate(CategorySeedData);
  console.log("\n----- CATEGORIES SEEDED -----\n");
  
  await Product.bulkCreate(ProductSeedData);
  console.log("\n----- PRODUCTS SEEDED -----\n");
  
  const Tags = await Tag.bulkCreate(TagSeedData);
  console.log("\n----- TAGS SEEDED -----\n");
  
  const ProductTags = await ProductTag.bulkCreate(ProductTagSeedData);
  console.log("\n----- PRODUCT TAGS SEEDED -----\n");
  
  process.exit(0);
  };

seedDatabase();
