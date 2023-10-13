'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class used_token extends Model {
    static associate({ user }) {
      this.belongsTo(user, { foreignKey: 'user_id' })
    }
  }
  used_token.init({
    token: DataTypes.STRING,
    isValid: DataTypes.ENUM('true', 'false')
  }, {
    sequelize,
    modelName: 'used_token',
  });
  return used_token;
};