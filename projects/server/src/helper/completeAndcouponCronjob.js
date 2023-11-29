const cron = require('node-cron');
const db = require('./../models');
const { Sequelize } = require('sequelize');

cron.schedule('*/1 * * * *', async () => { // Run every 1 minute
    try {
        console.log("This is update status cron job");

        // Define a timestamp for 1 minute ago
        const oneMinuteAgo = new Date();
        oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);

        // Update transactions with status "Delivered" that are older than 1 minute to "Complete"
        await db.transactions.update(
            { status: 'Complete' },
            {
                where: {
                    status: 'Delivered',
                    updatedAt: {
                        [Sequelize.Op.lt]: oneMinuteAgo,
                    },
                },
            }
        );
    } catch (error) {
        console.error('Error in scheduled job:', error);
    }
});

module.exports = cron;
