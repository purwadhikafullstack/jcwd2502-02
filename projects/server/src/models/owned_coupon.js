'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class owned_coupon extends Model {
    static associate({ user }) {
      this.belongsTo(user, { foreignKey: 'user_id' })
    }
  }
  owned_coupon.init({
    isValid: DataTypes.ENUM('true', 'false')
  }, {
    sequelize,
    modelName: 'owned_coupon',
  });
  return owned_coupon;
};