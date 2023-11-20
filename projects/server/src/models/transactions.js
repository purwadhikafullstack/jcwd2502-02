'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    static associate({ user, transaction_detail, store_branch, coupon }) {
      this.belongsTo(user, { foreignKey: 'user_id' })
      this.hasMany(transaction_detail, { foreignKey: 'transaction_id' })
      this.belongsTo(store_branch, { foreignKey: 'store_branch_id' })
      this.belongsTo(coupon, { foreignKey: 'coupon_id' })
    }
  }
  transactions.init({
    invoice: DataTypes.STRING,
    subtotal: DataTypes.INTEGER,
    shipping_cost: DataTypes.INTEGER,
    discount_coupon: DataTypes.INTEGER,
    final_total: DataTypes.INTEGER,
    shipping_method: DataTypes.STRING,
    note: DataTypes.STRING,
    status: DataTypes.STRING,
    address: DataTypes.STRING,
    payment_proof: DataTypes.STRING,
    coupon_name: DataTypes.STRING,
    total_weight: DataTypes.INTEGER,
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