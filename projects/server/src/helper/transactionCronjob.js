const cron = require('node-cron');
const db = require('./../models');
const { Sequelize } = require('sequelize');
cron.schedule('*/1 * * * *', async () => { // ini nanti diubah jadi 1 jam sekali
    try {
        console.log("this is cancel transaction cron job");
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

// const cron = require('node-cron');
// const db = require('./../models'); // Adjust the path as needed
// const { Sequelize } = require('sequelize');

// // Schedule the job to run every minute
// cron.schedule('* * * * *', async () => {
//     try {
//         console.log("This is cancel transaction cron job");

//         // Define a timestamp for 1 minute ago
//         const oneMinuteAgo = new Date();
//         oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);

//         // Update transactions with status "pending" that are older than 1 minute to "canceled"
//         await db.transactions.update(
//             { status: 'canceled' },
//             {
//                 where: {
//                     status: 'pending',
//                     updatedAt: {
//                         [Sequelize.Op.lt]: oneMinuteAgo,
//                     },
//                 },
//             }
//         );
//     } catch (error) {
//         console.error('Error in scheduled job:', error);
//     }
// });

// module.exports = cron;