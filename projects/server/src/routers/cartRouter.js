const express = require("express");
const Router = express.Router();

const { cartController } = require('../controllers')
const { verify } = require('./../lib/jwt');


Router.get('/', verify, cartController.getCart)
Router.post('/add/:productId', verify, cartController.addCart)
Router.delete('/delete/:productId', verify, cartController.deleteItem)


module.exports = Router;