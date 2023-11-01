'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discount extends Model {
    static associate({ product_stock }) {
      this.hasMany(product_stock, { foreignKey: 'discount_id' })
    }
  }
  discount.init({
    type: DataTypes.STRING,
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
    paranoid: true,
    modelName: 'discount',
  });
  return discount;
};