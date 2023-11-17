const express = require("express");
const Router = express.Router();
const {stockController} = require('./../controllers');
const { verify } = require('./../lib/jwt');

// to get product stock history of all branches or one branch
Router.get(`/history`, verify, stockController.getProductStockHistory);

module.exports = Router;