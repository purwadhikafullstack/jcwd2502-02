const express = require("express");
const Router = express.Router();

const { verify } = require('./../lib/jwt');
const upload = require('../middlewares/upload')
const { transactionController } = require("../controllers");

Router.post('/option', transactionController.getShippingOption)
Router.post('/add', verify, transactionController.createOrder)
Router.post('/upload/:transactionId', verify, upload, transactionController.uploadPayment)

Router.get(`/all`, transactionController.getOrders)
Router.get(`/:transactionId`, verify, transactionController.getUserOrder)
Router.get(`/user/all`, verify, transactionController.getAllUserOrders)
Router.get('/data/transactions', verify, transactionController.transactionReportSalesData);

Router.patch('/cancel/:transactionId', verify, transactionController.cancelOrder)

module.exports = Router;