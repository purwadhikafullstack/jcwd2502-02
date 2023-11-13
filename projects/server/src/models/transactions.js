'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    static associate({ user, transaction_detail }) {
      this.belongsTo(user, { foreignKey: 'user_id' })
      this.hasMany(transaction_detail, { foreignKey: 'transaction_id' })
    }
  }
  transactions.init({
    invoice: DataTypes.STRING,
    coupon_used: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    shipping_cost: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    final_total: DataTypes.INTEGER,
    shipping_method: DataTypes.STRING,
    note: DataTypes.STRING,
    status: DataTypes.STRING,
    address: DataTypes.STRING,
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
    modelName: 'transactions',
  });
  return transactions;
};