'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class province extends Model {
    static associate({ user_address, city }) {
      this.hasMany(user_address, { foreignKey: 'province_id' })
      this.belongsTo(city, { foreignKey: 'city_id' })
    }
  }
  province.init({
    name: DataTypes.STRING,
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
    modelName: 'province',
  });
  return province;
};