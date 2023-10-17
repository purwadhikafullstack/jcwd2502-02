'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discount extends Model {
    static associate({ product, product_category }) {
      this.belongsTo(product, { foreignKey: 'products_id' })
      this.belongsTo(product_category, { foreignKey: 'products_id' })
    }
  }
  discount.init({
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    expire: DataTypes.DATE,
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
    modelName: 'discount',
  });
  return discount;
};