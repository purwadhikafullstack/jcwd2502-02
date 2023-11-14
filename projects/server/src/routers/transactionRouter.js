const express = require("express");
const Router = express.Router();

const { verify } = require('./../lib/jwt');
const { transactionController } = require("../controllers");

Router.post('/option', transactionController.getShippingOption)
Router.post('/add', verify, transactionController.createOrder)
Router.get(`/all`, transactionController.getOrders)
Router.get(`/:transactionId`, verify, transactionController.getUserOrder)


module.exports = Router;