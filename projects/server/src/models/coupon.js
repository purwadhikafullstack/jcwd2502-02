'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coupon extends Model {
    static associate({ owned_coupon, transactions }) {
      this.hasMany(owned_coupon, { foreignKey: 'coupon_id' })
      this.hasMany(transactions, { foreignKey: 'coupon_id' })
    }
  }
  coupon.init({
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
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
    modelName: 'coupon',
  });
  return coupon;
};