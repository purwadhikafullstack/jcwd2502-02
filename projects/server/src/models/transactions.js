'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    static associate({ user }) {
      this.belongsTo(user, { foreignKey: 'user_id' })
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
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};