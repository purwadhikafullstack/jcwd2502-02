// const cron = require('node-cron');
// const db = require('./../models'); // Adjust the path as needed
// const { Sequelize } = require('sequelize');

// // Schedule the job to run every 24 hours
// cron.schedule('*/1 * * * *', async () => { // Run every 2 minutes
//     try {
//         // Define a timestamp for 24 hours ago
//         const twentyFourHoursAgo = new Date();
//         twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

//         // Update transactions with status "pending" that are older than 24 hours to "canceled"
//         await db.transactions.update(
//             { status: 'canceled' },
//             {
//                 where: {
//                     status: 'pending',
//                     updatedAt: {
//                         [Sequelize.Op.lt]: twentyFourHoursAgo,
//                     },
//                 },
//             }
//         );
//     } catch (error) {
//         console.error('Error in scheduled job:', error);
//     }
// });

// module.exports = cron;
