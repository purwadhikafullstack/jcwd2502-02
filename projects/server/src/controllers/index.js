const usersController = require('./usersController');
const productsController = require('./productsController');
const categoryController = require('./categoryController');
const branchController = require('./branchController')
const cartController = require('./cartController')
const locationController = require('./locationController')
const transactionController = require('./transactionController')
const stockController = require('./stockController');
const chartController = require('./chartController');

module.exports = {
    usersController,
    productsController,
    categoryController,
    branchController,
    cartController,
    locationController,
    transactionController,
    stockController,
    chartController
}