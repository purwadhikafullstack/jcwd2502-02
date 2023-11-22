const express = require("express");
const Router = express.Router();

const { verify } = require('./../lib/jwt');
const upload = require('../middlewares/upload')
const { transactionController } = require("../controllers");

Router.post('/option', transactionController.getShippingOption)
Router.post('/add', verify, transactionController.createOrder)
Router.post('/upload/:transactionId', verify, upload, transactionController.uploadPayment)

Router.get('/coupon/user', verify, transactionController.getUserCoupon);
Router.get(`/all`, transactionController.getOrders)
Router.get(`/user/order/:transactionId`, verify, transactionController.getUserOrder)
Router.get(`/admin/order/:transactionId`, verify, transactionController.getUserOrderForAdmin)
Router.get(`/user/all`, verify, transactionController.getAllUserOrders)
Router.get('/data/transactions', verify, transactionController.transactionReportSalesData);
Router.get('/data/product-transaction', verify, transactionController.transactionReportProductData);
Router.get('/data/overall-transaction', transactionController.getOverallTransactionData);

Router.patch('/cancel/:transactionId', verify, transactionController.cancelOrder)
Router.patch('/admin/cancel/:transactionId', verify, transactionController.adminCancelOrder)
Router.patch('/admin/approve/:transactionId', verify, transactionController.adminApproveOrder)
Router.patch('/admin/send/:transactionId', verify, transactionController.adminSendOrder)
Router.patch('/admin/cancel-send/:transactionId', verify, transactionController.adminCancelSendOrder)
Router.patch('/user/complete/:transactionId', verify, transactionController.userCompleteOrder)

module.exports = Router;