'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_stock extends Model {
    static associate({ product }) {
      this.belongsTo(product, { foreignKey: 'products_id' })
    }
  }
  product_stock.init({
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product_stock',
  });
  return product_stock;
};