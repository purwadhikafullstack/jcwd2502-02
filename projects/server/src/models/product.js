'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate({ product_category, coupon, cart, stock_history, product_stock, transaction_detail, discount }) {
      this.belongsTo(product_category, { foreignKey: 'product_categories_id' })
      this.hasMany(cart, { foreignKey: 'products_id' })
      this.hasMany(coupon, { foreignKey: 'products_id' })
      this.hasMany(stock_history, { foreignKey: 'products_id' })
      this.hasMany(product_stock, { foreignKey: 'products_id' })
      this.hasMany(transaction_detail, { foreignKey: 'products_id' })
      this.belongsTo(discount, { foreignKey: 'discount_id' })
    }
  }
  product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    discount_value: DataTypes.INTEGER,
    final_price: DataTypes.INTEGER,
    isDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'product', paranoid: true
  });
  return product;
};