'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_detail extends Model {
    static associate({ transactions, product, discount }) {
      this.belongsTo(transactions, { foreignKey: 'transaction_id' })
      this.belongsTo(product, { foreignKey: 'products_id' })
      this.belongsTo(discount, { foreignKey: 'discount_id' })
    }
  }
  transaction_detail.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    discount_value: DataTypes.INTEGER,
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
    modelName: 'transaction_detail',
  });
  return transaction_detail;
};