const express = require("express");
const Router = express.Router();
const { validateUserLogin, validateUserRegistration, handleValidationErrors } = require('./../middlewares/validator');
const { verify } = require('./../lib/jwt');
const upload = require('../middlewares/upload')
const { usersController } = require("../controllers");

Router.post('/login', validateUserLogin, handleValidationErrors, usersController.login);
Router.post('/register', validateUserRegistration, handleValidationErrors, usersController.register);
Router.post('/branch-manager', validateUserRegistration, handleValidationErrors, usersController.registerBranchAdmin);
Router.post('/verify-user-profile', verify, usersController.verifyUserProfile);
Router.post('/request-reset', usersController.requestResetPassword);
Router.patch('/reset-password', verify, usersController.resetPassword);
Router.patch('/update-password', verify, usersController.updatePassword);
Router.patch('/update-user', verify, usersController.updateUserData);
Router.patch('/verify-user', verify, usersController.verifyUserAccount);
Router.patch('/update-image', verify, upload, usersController.updateImage);
Router.patch('/deactivate-admin', usersController.deactivateAdmin);
Router.patch('/edit-admin', verify, usersController.editAdmin);
Router.get('/fetch-user', verify, usersController.getUser);
Router.get('/find-all', usersController.getAllUsers);
Router.get('/check-token', usersController.checkPasswordToken);
Router.get('/get-admin', usersController.getAllBranchAdmin);
Router.get('/admin-filter', usersController.filterBranchAdmin);
Router.get('/reff/:getRef', usersController.checkReferral);

module.exports = Router;