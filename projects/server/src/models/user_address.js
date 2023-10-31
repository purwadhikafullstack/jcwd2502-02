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
    name: DataTypes.STRING,
    isPrimary: DataTypes.ENUM('true', 'false'),
    coordinate: DataTypes.STRING,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    city_name: DataTypes.STRING,
    province_name: DataTypes.STRING,
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
    modelName: 'user_address',
  });
  return user_address;
};