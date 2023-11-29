const db = require("./../models");
const { Sequelize } = require("sequelize");
module.exports = {

    executeCouponQueries: async (giftCouponQuery, completeOrderQuery, expiryCouponQuery) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await db.sequelize.query(giftCouponQuery);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await db.sequelize.query(completeOrderQuery);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await db.sequelize.query(expiryCouponQuery);
        } catch (error) {
            console.error("Error executing coupon queries:", error);
            throw error;
        }
    },
}