'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate({ product_category, coupon, cart, transaction_detail, stock_history, product_stock, discount }) {
      this.belongsTo(product_category, { foreignKey: 'product_categories_id' })
      this.hasMany(cart, { foreignKey: 'products_id' })
      this.hasMany(coupon, { foreignKey: 'products_id' })
      this.hasMany(transaction_detail, { foreignKey: 'products_id' })
      this.hasMany(stock_history, { foreignKey: 'products_id' })
      this.hasMany(product_stock, { foreignKey: 'products_id' })
      this.hasMany(discount, { foreignKey: 'products_id' })
    }
  }
  product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};