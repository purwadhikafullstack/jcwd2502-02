'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_stock extends Model {
    static associate({ product, store_branch }) {
      this.belongsTo(product, { foreignKey: 'products_id' })
      this.belongsTo(store_branch, { foreignKey: 'store_branch_id' })
    }
  }
  product_stock.init({
    stock: DataTypes.INTEGER,
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
    modelName: 'product_stock',
  });
  return product_stock;
};