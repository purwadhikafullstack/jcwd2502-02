const db = require('./../models');
const { Op, Sequelize } = require('sequelize');

module.exports = {
    fetchProductSalesReport: async (dataToken, query) => {
        console.log(`sampe sini`);
        try {
            console.log(`masuk endpoint`);
            let whereCondition = {};
            const { role, store_branch_id } = dataToken;
            console.log(dataToken);
            const { sortHow, sortBy, productName, branch, startDate, endDate, page } = query;

            console.log(query);
            if (role === "admin") {
                whereCondition.store_branch_id = store_branch_id
            }
            else if (role === "superadmin") {
                if (branch) {
                    whereCondition.store_branch_id = branch
                }
                // else {
                //     whereCondition.store_branch_id = ""
                // }
            }

            if (productName) {
                whereCondition.name = { [Op.like]: `%${productName}%` }
            }
            if (startDate && endDate) whereCondition.createdAt = {
                [Op.gte]: new Date(startDate), [Op.lte]: new Date(endDate + 'T23:59:59.999Z')
            }

            console.log(sortBy);
            console.log(sortHow);
            console.log(whereCondition);
            const limit = 6;
  
            const offset = (page - 1) * limit;
            console.log(`jalan sampe sini`);
            const data = await db.transaction_detail.findAndCountAll({
                attributes: [
                    [db.sequelize.literal('transaction_detail.name'), 'name'],
                    [db.sequelize.literal('transaction_detail.price'), 'price'],
                    [db.sequelize.literal('transaction_detail.products_id'), 'products_id'],
                    [db.sequelize.literal('transaction_detail.store_branch_id'), 'store_branch_id'],
                    // [db.sequelize.literal('transaction_detail.createdAt'), 'date'],

                    [db.sequelize.fn('DATE', db.sequelize.col('transaction_detail.createdAt')), 'date'],

                    [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'quantity_total'],
                    [db.sequelize.literal('SUM(transaction_detail.price * quantity)'), 'total_sales']
                ],
                include: [{
                    model: db.product, attributes: ["product_categories_id"],
                    include: [{ model: db.product_category, attributes: ["name"] }]
                }],
                group: ["transaction_detail.name", "transaction_detail.price", "transaction_detail.products_id", "transaction_detail.store_branch_id", Sequelize.fn('DATE', Sequelize.col('transaction_detail.createdAt'))],
                order: [[sortBy, sortHow]],
                where: { ...whereCondition },
                limit,
                offset
            });
            const totalRecords = data.count.length;
            console.log(`ini total recordsnya ${totalRecords}`);
            const maxPages = Math.ceil(totalRecords / limit);
            console.log(`kelar dapet data`);
            dataFinal = data.rows
            return {
                maxPages,
                dataFinal
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}