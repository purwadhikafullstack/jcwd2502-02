const db = require("./../models")
const responseHandler = require("./../utils/responseHandler")

module.exports = {
    userReportRegistration: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    },
    orderCountTracker: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    },
    totalSalesData: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    },
    totalUsers: async (req, res, next) => {
        try {
            const data = await db.user.count({where: {role: "customer"}})
            responseHandler(res, "total customers found", data)
        } catch (error) {
            next(error);
        }
    },
    totalStocks: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    }
}