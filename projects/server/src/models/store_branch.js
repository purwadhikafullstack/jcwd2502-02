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
    coordinate: DataTypes.STRING,
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
    modelName: 'store_branch',
  });
  return store_branch;
};