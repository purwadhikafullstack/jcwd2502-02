const db = require('./../models');
const { Op } = require('sequelize');

module.exports = {
    stockHistory: async(req) => {
        try {
            const {role, id} = req.dataToken;
            const {product, branch, description, startDate, endDate, page} = req.query;
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
            if (startDate && endDate) whereCondition.createdAt = {
                [Op.gte]: new Date(startDate), [Op.lte]: new Date(endDate + 'T23:59:59.999Z')
            }
            if(role == "admin") {
                const admin = await db.user.findOne({where: id})
                whereCondition.store_branch_id = admin.dataValues.store_branch_id
                console.log(whereCondition);
                const productData = await db.stock_history.findAndCountAll({
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
                        {
                            model: db.store_branch,
                            attributes: ["name"],
                        }
                    ],
                })
                const totalRecords = productData.count
                const maxPages = Math.ceil(totalRecords / limit);
                productStockHistory = productData.rows
                return {
                    productStockHistory,
                    maxPages
                }
            } else if (role == "superadmin") {
                if(branch) {
                    whereCondition.store_branch_id = branch
                }
                const productData = await db.stock_history.findAndCountAll({
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
                        {
                            model: db.store_branch,
                            attributes: ["name"],
                        }
                    ],
                })
                const totalRecords = productData.count
                const maxPages = Math.ceil(totalRecords / limit);
                productStockHistory = productData.rows
                return {
                    productStockHistory,
                    maxPages
                }
            }
        } catch (error) {
            console.log(error);
            return error
        }
    }
}