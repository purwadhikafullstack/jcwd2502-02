const cron = require('node-cron');
const db = require('./../models'); // Adjust the path as needed
const { Sequelize } = require('sequelize');
cron.schedule('0 * * * *', async () => {
    try {
        console.log("This is coupon cron job");
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setHours(sevenDaysAgo.getHours() - 24 * 7);
        await db.owned_coupon.update(
            { isValid: 'false' },
            {
                where: {
                    isValid: 'true',
                    createdAt: {
                        [Sequelize.Op.lt]: sevenDaysAgo,
                    },
                },
            }
        );
    } catch (error) {
        console.error('Error in coupon validity cron job:', error);
    }
});

module.exports = cron;
