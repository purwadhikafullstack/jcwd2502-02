const express = require("express");
const Router = express.Router();

const { verify } = require('./../lib/jwt');
const upload = require('../middlewares/upload')
const { transactionController } = require("../controllers");

Router.post('/option', transactionController.getShippingOption)
Router.post('/add', verify, transactionController.createOrder)
Router.post('/upload/:transactionId', upload, transactionController.uploadPayment)

Router.get(`/all`, transactionController.getOrders)
Router.get(`/:transactionId`, verify, transactionController.getUserOrder)
Router.get(`/user/all`, verify, transactionController.getAllUserOrders)

Router.patch('/cancel/:transactionId', transactionController.cancelOrder)

module.exports = Router;