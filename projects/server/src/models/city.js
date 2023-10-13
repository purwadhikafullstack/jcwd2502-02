'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    static associate({ province }) {
      this.hasMany(province, { foreignKey: 'city_id' })
    }
  }
  city.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'city',
  });
  return city;
};