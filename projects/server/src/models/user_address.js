'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_address extends Model {
    static associate({ user, province }) {
      this.belongsTo(user, { foreignKey: 'user_id' })
      this.belongsTo(province, { foreignKey: 'province_id' })
    }
  }
  user_address.init({
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    isPrimary: DataTypes.ENUM('true', 'false'),
    coordinate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_address',
  });
  return user_address;
};