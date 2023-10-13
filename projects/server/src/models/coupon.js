'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coupon extends Model {
    static associate({ product }) {
      this.belongsTo(product, { foreignKey: 'products_id' })
    }
  }
  coupon.init({
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'coupon',
  });
  return coupon;
};