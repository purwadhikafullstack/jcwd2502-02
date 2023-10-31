const express = require("express");
const Router = express.Router();
const { validateUserLogin, validateUserRegistration, handleValidationErrors } = require('./../middlewares/validator');
const { verify } = require('./../lib/jwt');
const upload = require('../middlewares/upload')
// Import All Controller

const { usersController } = require("../controllers");

Router.post('/login', validateUserLogin, handleValidationErrors, usersController.login);
Router.post('/register', validateUserRegistration, handleValidationErrors, usersController.register);
Router.post('/request-reset', usersController.requestResetPassword);

Router.patch('/reset-password', verify, usersController.resetPassword);
Router.patch('/update-password', verify, usersController.updatePassword);
Router.patch('/update-user', usersController.updateUserData);
Router.patch('/verify-user', verify, usersController.verifyUserAccount);
Router.patch('/update-image', verify, upload, usersController.updateImage)

Router.get('/fetch-user', verify, usersController.getUser);
Router.get('/find-all', usersController.getAllUsers);
Router.get('/check-token', verify, usersController.checkPasswordToken);

module.exports = Router;