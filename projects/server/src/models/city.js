'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    static associate({ user_address, province, store_branch }) {
      this.hasMany(user_address, { foreignKey: 'city_id' })
      this.belongsTo(province, { foreignKey: 'province_id' })
      this.hasMany(store_branch, { foreignKey: 'city_id' })
    }
  }
  city.init({
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
    modelName: 'city',
  });
  return city;
};