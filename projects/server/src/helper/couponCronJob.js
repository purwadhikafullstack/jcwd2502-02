const cron = require('node-cron');
const db = require('./../models'); // Adjust the path as needed
const { Sequelize } = require('sequelize');

// Schedule the job to run every minute
cron.schedule('* * * * *', async () => { // Run every minute
    try {
        // Define a timestamp for 1 minute ago
        const oneMinuteAgo = new Date();
        oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);

        // Update owned coupons with isValid "true" that are older than 1 minute to "false"
        await db.owned_coupon.update(
            { isValid: 'false' },
            {
                where: {
                    isValid: 'true',
                    createdAt: {
                        [Sequelize.Op.lt]: oneMinuteAgo,
                    },
                },
            }
        );
    } catch (error) {
        console.error('Error in coupon validity cron job:', error);
    }
});

module.exports = cron;
