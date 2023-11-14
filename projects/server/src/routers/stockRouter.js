const express = require("express");
const Router = express.Router();
const {stockController} = require('./../controllers');

// to get product stock history of all branches or one branch
Router.get(`/history`, stockController.getProductStockHistory);

module.exports = Router;