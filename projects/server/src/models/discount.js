'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discount extends Model {
    static associate({ product, product_category, discount_type, owned_coupon }) {
      this.belongsTo(product, { foreignKey: 'products_id' })
      this.belongsTo(product_category, { foreignKey: 'products_id' })
      this.belongsTo(discount_type, { foreignKey: 'discount_type_id' })
      this.hasMany(owned_coupon, { foreignKey: 'discount_id' })
    }
  }
  discount.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    max_discount: DataTypes.INTEGER,
    isValid: DataTypes.INTEGER,
    expire: DataTypes.DATE,
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