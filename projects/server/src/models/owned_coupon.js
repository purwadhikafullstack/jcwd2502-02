'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class owned_coupon extends Model {
    static associate({ user, discount }) {
      this.belongsTo(user, { foreignKey: 'user_id' })
      this.belongsTo(discount, { foreignKey: 'discount_id' })
    }
  }
  owned_coupon.init({
    isValid: DataTypes.ENUM('true', 'false'),
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
    modelName: 'owned_coupon',
  });
  return owned_coupon;
};