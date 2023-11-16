const { Op } = require("sequelize");
const db = require("./../models");
module.exports = {
    // getOrderCountByBranch: async (req) => {
    //     try {
    //         let orders
    //         const store_branch_id = req.query.branch
    //         console.log(store_branch_id);
    //         if(store_branch_id) {
    //             orders = await db.transactions.findAll({where: {store_branch_id} })
    //         } else {
    //             orders = await db.transactions.findAll()
    //         }
    //         const sortedData = orders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    //         const groupedData = sortedData.reduce((result, item) => {
    //         const date = new Date(item.createdAt).toISOString().split('T')[0];
    //         result[date] = (result[date] || 0) + 1;
    //             return result;
    //         }, {});
    //         const resultArray = Object.keys(groupedData).map(date => ({
    //         date,
    //         count: groupedData[date],
    //         }));
    //         const formattedResult = resultArray.map(item => ({
    //             date: new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
    //             count: item.count,
    //         }));
    //         return formattedResult;
    //     } catch (error) {
    //         return error;
    //     }
    // },

    getOrderCountByBranch: async (req) => {
        try {
            let orders;
            const adminData = req.dataToken;
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            if(adminData.role == 'admin') {
                const response = await db.user.findOne({where: {id: adminData.id}})
                orders = await db.transactions.findAll({
                    where: {
                        store_branch_id: response.dataValues.store_branch_id,
                        createdAt: {
                            [Op.gte]: sevenDaysAgo,
                        },
                    },
                });
            }
            const store_branch_id = req.query.branch;
            if(adminData.role == "superadmin") {
                if(store_branch_id) {
                    orders = await db.transactions.findAll({
                        where: {
                            store_branch_id,
                            createdAt: {
                                [Op.gte]: sevenDaysAgo,
                            },
                        },
                    });
                } else {
                    orders = await db.transactions.findAll({
                        where: {
                            createdAt: {
                                [Op.gte]: sevenDaysAgo, 
                            },
                        },
                    });
                }
            }
            const sortedData = orders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            const groupedData = sortedData.reduce((result, item) => {
                const date = new Date(item.createdAt).toISOString().split('T')[0];
                result[date] = (result[date] || 0) + 1;
                return result;
            }, {});
            const resultArray = Object.keys(groupedData).map(date => ({
                date,
                count: groupedData[date],
            }));
            const formattedResult = resultArray.map(item => ({
                date: new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
                count: item.count,
            }));
            return formattedResult;
        } catch (error) {
            return error;
        }
    },

    getNewUserCount: async (req) => {
        try {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            users = await db.user.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: sevenDaysAgo, 
                    },
                },
            });
            const sortedData = users.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            const groupedData = sortedData.reduce((result, item) => {
                const date = new Date(item.createdAt).toISOString().split('T')[0];
                result[date] = (result[date] || 0) + 1;
                return result;
            }, {});
            const resultArray = Object.keys(groupedData).map(date => ({
                date,
                count: groupedData[date],
            }));
            const formattedResult = resultArray.map(item => ({
                date: new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
                count: item.count,
            }));
            return formattedResult;
        } catch (error) {
            return error;
        }
    },

    getTopProduct: async (req) => {
        try {
            const data = await db.transaction_detail.findAll()
            const productQuantities = data.reduce((acc, item) => {
                const productId = item.products_id;
                const quantity = item.quantity;
            if (acc[productId]) {
                acc[productId] += quantity;
            } else {
                acc[productId] = quantity;
            }
            return acc;
            }, {});
            const mostSoldProductId = Object.keys(productQuantities).reduce((a, b) =>
                productQuantities[a] > productQuantities[b] ? a : b
            );
            const mostSoldProduct = data.find((item) => item.products_id === parseInt(mostSoldProductId));
            return mostSoldProduct.name
        } catch (error) {
            return error
        }
    }
}