const express = require("express");
const Router = express.Router();

const { chartController } = require('../controllers')

Router.get('/user-total', chartController.totalUsers)

module.exports = Router;