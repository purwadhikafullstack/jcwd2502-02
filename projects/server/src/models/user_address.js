'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_address extends Model {
    static associate({ user, city }) {
      this.belongsTo(user, { foreignKey: 'user_id' })
      this.belongsTo(city, { foreignKey: 'city_id' })
    }
  }
  user_address.init({
    address: DataTypes.STRING,
    name: DataTypes.STRING,
    isPrimary: DataTypes.ENUM('true', 'false'),
    longitude: DataTypes.DECIMAL(11, 8),
    latitude: DataTypes.DECIMAL(10, 8),
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
    modelName: 'user_address', paranoid: true
  });
  return user_address;
};