const db = require('./../models');
const { Op, Sequelize } = require('sequelize');

module.exports = {
    fetchProductSalesReport: async (dataToken, query) => {
        try {
            let whereCondition = {};
            const { role, store_branch_id } = dataToken;
            console.log(query);
            const { sortHow, sortBy, productName, branch, startDate, endDate, page } = query;
            if (role === "admin") {
                whereCondition.store_branch_id = store_branch_id
            }
            if (role === "superadmin") {
                if (branch) {
                    whereCondition.store_branch_id = branch
                }
            }
            if (productName) {
                whereCondition.name = { [Op.like]: `%${productName}%` }
            }
            if (startDate && endDate) whereCondition.createdAt = {
                [Op.gte]: new Date(startDate), [Op.lte]: new Date(endDate + 'T23:59:59.999Z')
            }
            const limit = 6;
            const offset = (page - 1) * limit;
            console.log(whereCondition);
            const data = await db.transaction_detail.findAndCountAll({
                attributes: [
                    [db.sequelize.literal('transaction_detail.name'), 'name'],
                    [db.sequelize.literal('transaction_detail.price'), 'price'],
                    [db.sequelize.literal('transaction_detail.products_id'), 'products_id'],
                    [db.sequelize.literal('transaction_detail.store_branch_id'), 'store_branch_id'],
                    [db.sequelize.fn('DATE', db.sequelize.col('transaction_detail.createdAt')), 'date'],
                    [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'quantity_total'],
                    [db.sequelize.literal('SUM(transaction_detail.price * quantity)'), 'total_sales'],
                ],
                include: [
                    {
                        model: db.transactions,
                        attributes: ["status"],
                        where: {
                            status: {[Op.not]: "canceled"}
                        },
                        include: [{model: db.store_branch, attributes: ["name"]}]
                    },  
                    {
                        model: db.product, 
                        attributes: ["product_categories_id"],
                        include: [{ model: db.product_category, attributes: ["name"] }]
                    }
                ],
                group: ["transaction_detail.name", "transaction_detail.price", "transaction_detail.products_id", "transaction_detail.store_branch_id", Sequelize.fn('DATE', Sequelize.col('transaction_detail.createdAt'))],
                order: [[sortBy, sortHow]],
                where: { ...whereCondition },
                limit,
                offset
            });
            const totalRecords = data.count.length;
            const maxPages = Math.ceil(totalRecords / limit);
            dataFinal = data.rows
            return {
                maxPages,
                dataFinal
            }
        } catch (error) {
            return error;
        }
    },

    fetchDashboardCardData: async (req) => {
        try {
            console.log(req.query);
            const {branch} = req.query;
            const {role, store_branch_id} = req.dataToken;
            let whereCondition = {};
            console.log(role, store_branch_id, branch);
            if(role === "superadmin") {
                if(branch) whereCondition.store_branch_id = branch
            } else if (role == "admin") {
                whereCondition.store_branch_id = store_branch_id
            }
            const userData = await db.user.findAndCountAll({
                where: {
                    role: "customer",
                    createdAt: {
                        [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                    }
                }
            })
            const orderData = await db.transactions.findAndCountAll({
                where: {
                    ...whereCondition,
                    status: {
                        [Op.notIn]: ["Complete", "canceled"]
                    }
                }
            })
            const productData = await db.product.findAndCountAll()
            const userCount = userData.count
            const productCount = productData.count
            const orderCount = orderData.count
            return {
                userCount,
                productCount,
                orderCount
            }
        } catch (error) {
            return error;
        }
    }
}