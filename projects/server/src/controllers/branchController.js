const db = require('../models');
const fs = require('fs').promises;
const responseHandler = require("./../utils/responseHandler")
const { getBranchService } = require("./../services/branchService");
const { nearestBranchService } = require("./../services/branchService");
module.exports = {
    getbranch: async (req, res, next) => {
        try {
            const allBranch = await getBranchService()
            responseHandler(res, "Get All Branch Success", allBranch)
        } catch (error) {
            next(error)
        }
    },
    nearestBranch: async (req, res, next) => {
        try {
            const product = await nearestBranchService(req.params)
            responseHandler(res, "Get Nearest Branch Success", product)
        } catch (error) {
            next(error)
        }
    },

    getRecommendProduct: async (req, res, next) => {
        try {
            const { branchId } = req.query;
            const whereClause = { isDeleted: 0 };

            const includeProductStock = branchId
                ? [
                    {
                        model: db.product_stock,
                        where: { store_branch_id: branchId },
                    },
                ]
                : [];

            const products = await db.product.findAll({
                where: { ...whereClause },
                include: includeProductStock,
                order: [['product_categories_id', 'ASC']],
                group: ['product_categories_id'],  // Group by product_categories_id
            });

            const result = res.json({
                products,
            });
        } catch (error) {
            next(error);
        }
    }

}