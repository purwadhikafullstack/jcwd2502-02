const db = require('./../models');
const { Op } = require('sequelize');

module.exports = {
    stockHistory: async (req) => {
        try {
            const limit = 6;
            const {product, branch, description, page} = req.query;
            let whereCondition = {};
            if(product) {
                whereCondition.product = {
                    [Op.like]: `%${product}%`,
                }
            }
            if(branch) {
                whereCondition.store_branch_id = branch
            }
            if(description) {
                whereCondition.description = {
                    [Op.like]: `%${description}%`,
                }
            }
            const totalRecords = await db.stock_history.count({ where: whereCondition });
            const maxPages = Math.ceil(totalRecords / limit);
            const offset = (page - 1) * limit;
            const productStockHistory = await db.stock_history.findAll({
                where: whereCondition, 
                limit, 
                offset, 
                order: [["createdAt", "DESC"]]
            })
            console.log(`akan ngambil data stock history di filter untuk produk ${product}, dari cabang ${branch} dengan deskripsi ${description}, dan halaman ${page}`);
            return {
                productStockHistory,
                maxPages
            }
        } catch (error) {
            console.log(error);
            return error
        }
    }
}