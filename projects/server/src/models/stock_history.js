'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock_history extends Model {
    static associate({ product }) {
      this.belongsTo(product, { foreignKey: 'products_id' })
    }
  }
  stock_history.init({
    stock: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'stock_history',
  });
  return stock_history;
};