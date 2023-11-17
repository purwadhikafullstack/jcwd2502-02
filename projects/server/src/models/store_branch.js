'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store_branch extends Model {
    static associate({ user, product_stock, stock_history, transactions, city }) {
      this.hasMany(user, { foreignKey: 'store_branch_id' })
      this.hasMany(product_stock, { foreignKey: 'store_branch_id' })
      this.hasMany(stock_history, { foreignKey: 'store_branch_id' })
      this.hasMany(transactions, { foreignKey: 'store_branch_id' })
      this.belongsTo(city, { foreignKey: 'city_id' })
    }
  }
  store_branch.init({
    address: DataTypes.STRING,
    province: DataTypes.STRING,
    name: DataTypes.STRING,
    longitude: DataTypes.DECIMAL(11, 8),
    latitude: DataTypes.DECIMAL(10, 8),
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
    modelName: 'store_branch',
  });
  return store_branch;
};