const db = require('./../models');
const responseHandler = require("./../utils/responseHandler")
const { stockHistory } = require('./../services/stockService');

module.exports = {
    getProductStockHistory: async (req, res, next) => {
        try {
            const data = await stockHistory(req)
            responseHandler(res, 'Stock data retrieved', data)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}