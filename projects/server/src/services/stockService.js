const db = require('./../models');
const { Op } = require('sequelize');

module.exports = {
    stockHistory: async(req) => {
        try {
            const {role, id} = req.dataToken;
            const {product, branch, description, page} = req.query;
            let whereCondition = {};
            let nameCondition = {};
            const limit = 6;
            const offset = (page - 1) * limit;
            if(product) {
                nameCondition.name = {[Op.like]: `%${product}%`}
            }
            if(description) {
                whereCondition.description = {[Op.like]: `%${description}%`}
            }
            if(role == "admin") {
                const response = await db.user.findOne({where: id})
                whereCondition.store_branch_id = response.dataValues.store_branch_id
                console.log(whereCondition);
                const productStockHistory = await db.stock_history.findAll({
                    where: whereCondition,
                    limit,
                    offset,
                    order: [["createdAt", "ASC"]],
                    include: [
                        {
                        model: db.product,
                        attributes: ['id', 'name'],
                        where: nameCondition
                        },
                    ],
                })
                const totalRecords = await db.stock_history.count({ where: whereCondition });
                const maxPages = Math.ceil(totalRecords / limit);
                return {
                    productStockHistory,
                    maxPages
                }
            } else if (role == "superadmin") {
                if(branch) {
                    whereCondition.store_branch_id = branch
                }
                const productStockHistory = await db.stock_history.findAll({
                    where: whereCondition,
                    limit,
                    offset,
                    order: [["createdAt", "ASC"]],
                    include: [
                        {
                        model: db.product,
                        attributes: ['id', 'name'],
                        where: nameCondition
                        },
                    ],
                })
                const totalRecords = await db.stock_history.count({ where: whereCondition });
                const maxPages = Math.ceil(totalRecords / limit);
                return {
                    productStockHistory,
                    maxPages
                }
            }
        } catch (error) {
            return error
        }
    }
}