'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class owned_coupon extends Model {
    static associate({ user, coupon }) {
      this.belongsTo(user, { foreignKey: 'user_id' })
      this.belongsTo(coupon, { foreignKey: 'coupon_id' })
    }
  }
  owned_coupon.init({
    isValid: DataTypes.ENUM('true', 'false'),
    coupon_value: DataTypes.INTEGER,
    coupon_name: DataTypes.STRING,
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