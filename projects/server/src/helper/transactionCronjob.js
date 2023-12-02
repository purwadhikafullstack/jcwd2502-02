const cron = require('node-cron');
const db = require('./../models');
const { Sequelize } = require('sequelize');
cron.schedule('*/1 * * * *', async () => {
    try {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        await db.transactions.update(
            { status: 'canceled' },
            {
                where: {
                    status: 'pending',
                    updatedAt: {
                        [Sequelize.Op.lt]: twentyFourHoursAgo,
                    },
                },
            }
        );


    } catch (error) {
        console.error('Error in scheduled job:', error);
    }
});
module.exports = cron;