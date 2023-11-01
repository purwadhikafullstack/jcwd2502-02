const express = require("express");
const Router = express.Router();

const { verify } = require('./../lib/jwt');
const { locationController } = require("../controllers");


Router.get('/province', locationController.getProvince)
Router.get('/city', locationController.getCity)

Router.post('/add-address', verify, locationController.addAddress)


module.exports = Router;