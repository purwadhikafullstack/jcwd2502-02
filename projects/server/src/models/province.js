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
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'province',
  });
  return province;
};