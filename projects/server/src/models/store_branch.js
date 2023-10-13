'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store_branch extends Model {
    static associate({ user }) {
      this.hasMany(user, { foreignKey: 'store_branch_id' })
    }
  }
  store_branch.init({
    address: DataTypes.STRING,
    coordinate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'store_branch',
  });
  return store_branch;
};