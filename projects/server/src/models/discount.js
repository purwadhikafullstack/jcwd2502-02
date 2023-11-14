'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discount extends Model {
    static associate({ transaction_detail }) {
      this.hasMany(transaction_detail, { foreignKey: 'discount_id' })
    }
  }
  discount.init({
    type: DataTypes.STRING,
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
    paranoid: true,
    modelName: 'discount',
  });
  return discount;
};