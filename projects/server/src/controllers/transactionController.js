const db = require("./../models")
const responseHandler = require("./../utils/responseHandler")
const { Sequelize } = require("sequelize");
const axios = require('axios');
const { Op, literal } = require("sequelize");
const { shippingOption, create, filteredAllOrder } = require('../services/transactionService')
module.exports = {
    getShippingOption: async (req, res, next) => {
        try {
            const { origin, destination, weight, courier } = req.body;
            const shippingOptions = await shippingOption(origin, destination, weight, courier);
            responseHandler(res, "Get Shipping Option Success", shippingOptions);
        } catch (error) {
            next(error);
        }
    },

    createOrder: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const orderDetails = req.body;
            const transactionDetails = await create(id, orderDetails);
            responseHandler(res, "Create Order Success", transactionDetails);
        } catch (error) {
            next(error);
        }
    },


    getOrders: async (req, res, next) => {
        try {
            const { invoice, status, createdAt, page, branchId } = req.query;
            const limit = 6;  // Number of records per page

            // Build the where clause based on the provided filters
            const whereClause = {};
            if (invoice) whereClause.invoice = { [Op.like]: `%${invoice}%` };
            if (status) whereClause.status = status;
            //kurang branchId
            if (createdAt) whereClause.createdAt = literal(`DATE(createdAt) = '${createdAt}'`);

            // Calculate the total number of records
            const totalRecords = await db.transactions.count({ where: whereClause });

            // Calculate the maximum number of pages
            const maxPages = Math.ceil(totalRecords / limit);

            // Use limit and offset to paginate the actual data
            const offset = (page - 1) * limit;
            const orders = await db.transactions.findAll({
                where: whereClause,
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });

            const result = res.json({
                orders,
                maxPages,
            });

            // responseHandler(res, "Get Orders Success", result);
        } catch (error) {
            next(error);
        }
    },

}
