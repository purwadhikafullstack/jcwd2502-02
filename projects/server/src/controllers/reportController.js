const db = require('../models');
const fs = require('fs').promises;
const responseHandler = require("./../utils/responseHandler");
const { fetchProductSalesReport } = require('./../services/reportService');

module.exports = {
    salesReportProduct: async (req, res, next) => {
        try {
            const data = await fetchProductSalesReport(req);
            responseHandler(res, 'product sales report 1', data)
        } catch (error) {
            next(error);
        }
    }
}