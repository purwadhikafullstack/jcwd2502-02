const express = require("express");
const Router = express.Router();

const { verify } = require('./../lib/jwt');
const { locationController } = require("../controllers");


Router.get('/province', locationController.getProvince)
Router.get('/city', locationController.getCity)
Router.get('/', verify, locationController.getAddress)
Router.get('/:id', locationController.getAddressById)
Router.get('/city/:id', locationController.getCitybyProv)
Router.get('/address/main', verify, locationController.getMainAddress)

Router.post('/add-address', verify, locationController.addAddress)

Router.patch('/main/:addressId', verify, locationController.changeMainAddress)
Router.patch('/:id', locationController.deleteAddress)
Router.patch('/address/:idAddress', locationController.updateAddress)

module.exports = Router;