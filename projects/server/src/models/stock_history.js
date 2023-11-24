'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock_history extends Model {
    static associate({ product, store_branch, transactions }) {
      this.belongsTo(product, { foreignKey: 'products_id' })
      this.belongsTo(store_branch, { foreignKey: 'store_branch_id' })
      this.belongsTo(transactions, { foreignKey: 'transaction_id' })
    }
  }
  stock_history.init({
    stock: DataTypes.INTEGER,
    description: DataTypes.STRING,
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
    modelName: 'stock_history',
  });
  return stock_history;
};