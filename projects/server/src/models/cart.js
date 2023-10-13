'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    static associate({ user, product }) {
      this.belongsToMany(user, { through: 'user_cart' })
      this.belongsTo(product, { foreignKey: 'products_id' })
    }
  }
  cart.init({
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};