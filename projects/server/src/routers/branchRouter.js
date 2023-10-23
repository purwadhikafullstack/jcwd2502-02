const express = require("express");
const Router = express.Router();

const { branchController } = require('../controllers')


Router.get('/all', branchController.getbranch)
Router.get('/nearest/:id', branchController.nearestBranch)


module.exports = Router;