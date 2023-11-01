'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    static associate({ user, product }) {
      this.belongsTo(user, { foreignKey: 'user_id' })
      this.belongsTo(product, { foreignKey: 'products_id' })
    }
  }
  cart.init({
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
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
    modelName: 'cart',
  });
  return cart;
};