const express = require("express");
const Router = express.Router();
const { reportController } = require('./../controllers');
const { verify } = require('./../lib/jwt');

Router.get('/data', verify, reportController.salesReportProduct);
Router.get('/dashboard-card', verify, reportController.dashboardCardData);
module.exports = Router;