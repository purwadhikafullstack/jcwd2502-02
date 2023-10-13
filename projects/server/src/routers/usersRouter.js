const express = require("express");
const Router = express.Router();

// Import All Controller

const { usersController } = require("../controllers");
Router.post("/login", usersController.login);
module.exports = Router;