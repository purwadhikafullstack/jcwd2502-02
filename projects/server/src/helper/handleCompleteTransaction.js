const db = require("./../models");

module.exports = {
    handleCompletedTransactions: async (userId) => {
        const transactions = await db.transactions.findAll({
            where: { user_id: userId, status: "Complete" }
        });

        const numberOfCompleteTransactions = transactions.length;
        const coupon2 = await db.coupon.findOne({ where: { id: 2 } });
        const coupon3 = await db.coupon.findOne({ where: { id: 3 } });

        if (numberOfCompleteTransactions % 3 === 0) {
            await db.owned_coupon.create({
                user_id: userId, coupon_id: coupon3.dataValues.id, coupon_value: 0, isValid: "true", coupon_name: coupon3.dataValues.name
            });
        }

        if (numberOfCompleteTransactions % 7 === 0) {
            await db.owned_coupon.create({
                user_id: userId, coupon_id: coupon2.dataValues.id, coupon_value: coupon2.dataValues.amount, isValid: "true", coupon_name: coupon2.dataValues.name
            });
        }
    }

}

