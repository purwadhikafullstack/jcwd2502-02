'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_category extends Model {
    static associate({ product, discount }) {
      this.hasMany(product, { foreignKey: 'product_categories_id' })
      this.hasMany(discount, { foreignKey: 'product_categories_id' })
    }
  }
  product_category.init({
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
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
    modelName: 'product_category', paranoid: true
  });
  return product_category;
};