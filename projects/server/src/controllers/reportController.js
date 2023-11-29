const db = require('../models');
const fs = require('fs').promises;
const responseHandler = require("./../utils/responseHandler");
const { fetchProductSalesReport, fetchDashboardCardData } = require('./../services/reportService');

module.exports = {
    salesReportProduct: async (req, res, next) => {
        try {
            console.log(`Masuk dari verify jwt`);
            const data = await fetchProductSalesReport(req.dataToken, req.query);
            responseHandler(res, 'product sales report 1', data)
        } catch (error) {
            next(error);
        }
    },

    dashboardCardData: async (req, res, next) => {
        try {
            const data = await fetchDashboardCardData(req);
            responseHandler(res, 'dashboard card-data fetched', data);
        } catch (error) {
            next(error);
        }
    }
}