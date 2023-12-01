const express = require("express");
const Router = express.Router();
const { stockController } = require('./../controllers');
const { verify } = require('./../lib/jwt');

Router.get(`/history`, verify, stockController.getProductStockHistory);

module.exports = Router;