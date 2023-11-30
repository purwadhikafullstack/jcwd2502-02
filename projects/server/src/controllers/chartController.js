const { getOrderCountByBranch, getNewUserCount, getTopProduct, getRevenueReport } = require("../services/chartService");
const db = require("./../models")
const responseHandler = require("./../utils/responseHandler");
module.exports = {
    newUserCount: async (req, res, next) => {
        try {
            const users = await getNewUserCount()
            responseHandler(res, 'new users found', users)
        } catch (error) {
            next(error);
        }
    },
    orderCountTracker: async (req, res, next) => {
        try {
            const orderCount = await getOrderCountByBranch(req)
            responseHandler(res, `order count sent`, orderCount)
        } catch (error) {
            next(error);
        }
    },
    totalUsers: async (req, res, next) => {
        try {
            const data = await db.user.count({ where: { role: "customer" } })
            responseHandler(res, "total customers found", data)
        } catch (error) {
            next(error);
        }
    },
    topSellingProduct: async (req, res, next) => {
        try {
            const product = await getTopProduct(req);
            responseHandler(res, 'top product fetched', product);
        } catch (error) {
            next(error);
        }
    },
    revenueReport: async (req, res, next) => {
        try {
            const data = await getRevenueReport(req);
            responseHandler(res, 'revenue report fetched', data)
        } catch (error) {
            next(error);
        }
    }
}