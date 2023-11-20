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

    getUserOrder: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const { transactionId } = req.params;

            const getOrder = await db.transactions.findOne({
                include: [
                    {
                        model: db.transaction_detail,
                        required: true
                    },
                ],
                where: { user_id: id, id: transactionId }
            });

            // Extract product IDs from transaction details
            const productIds = getOrder.transaction_details.map(detail => detail.id_product);

            // Fetch product details based on the extracted IDs
            const productDetails = await db.product.findAll({
                where: { id: productIds }
            });

            // Map product details to transaction details
            const updatedTransactionDetails = getOrder.transaction_details.map(detail => {
                const productDetail = productDetails.find(product => product.id === detail.id_product);
                return {
                    ...detail,
                    product_detail: productDetail // Add product details to each transaction detail
                };
            });


            // Update the getOrder object with the enhanced transaction details
            getOrder.transaction_details = updatedTransactionDetails;

            const result = res.json({
                getOrder
            });


            // responseHandler(res, "Get Order Success", getOrder);
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
            if (branchId) whereClause.store_branch_id = branchId;
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

    transactionReportSalesData: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    }

}
