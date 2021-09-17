const Category = require("./Category");
const Product = require("./Product");
const ProductTag = require("./ProductTag");
const Tag = require("./Tag");

Product.belongsTo(Category, {
  foreignKey: "category_id",
});

Category.hasMany(Product, {
  foreignKey: "category_id",
});

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
  foreignKey: "product_id",
});

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
  foreignKey: "tag_id",
});

module.exports = { Product, Category, ProductTag, Tag };
