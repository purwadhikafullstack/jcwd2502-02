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
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product_category',
  });
  return product_category;
};