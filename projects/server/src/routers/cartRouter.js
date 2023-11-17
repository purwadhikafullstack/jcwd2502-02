const express = require("express");
const Router = express.Router();

const { cartController } = require('../controllers')
const { verify } = require('./../lib/jwt');


Router.get('/', verify, cartController.getCart)
Router.post('/add', verify, cartController.addCart)
Router.delete('/delete/:productId', verify, cartController.deleteItem)
Router.patch('/delete-all/:productId', verify, cartController.deleteCartbyItem)


module.exports = Router;