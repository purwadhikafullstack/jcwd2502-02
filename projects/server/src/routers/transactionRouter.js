const express = require("express");
const Router = express.Router();

const { transactionController } = require("../controllers");

Router.post('/option', transactionController.getShippingOption)

module.exports = Router;