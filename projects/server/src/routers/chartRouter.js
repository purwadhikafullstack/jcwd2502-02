const express = require("express");
const Router = express.Router();
const { verify } = require('./../lib/jwt');
const { chartController } = require('../controllers')
Router.get('/user-total', chartController.totalUsers);
Router.get('/order-count', verify, chartController.orderCountTracker);
Router.get('/new-users', chartController.newUserCount);
Router.get('/top-product', chartController.topSellingProduct);
Router.get('/revenue-report', verify, chartController.revenueReport);
module.exports = Router;