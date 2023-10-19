'use strict';
const {
  Model
} = require('sequelize');
const transactions = require('./transactions');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate({ user_address, store_branch, cart, used_token, owned_coupon, transactions }) {
      this.hasMany(user_address, { foreignKey: 'user_id' })
      this.belongsTo(store_branch, { foreignKey: 'store_branch_id' })
      this.belongsToMany(cart, { through: 'user_cart' })
      this.hasMany(used_token, { foreignKey: 'user_id' })
      this.hasMany(owned_coupon, { foreignKey: 'user_id' })
      this.hasMany(transactions, { foreignKey: 'user_id' })
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    profile_picture: DataTypes.TEXT,
    isVerified: DataTypes.ENUM("true", "false"),
    referral_code: DataTypes.STRING,
    role: DataTypes.ENUM("customer", "superadmin", "admin")
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};