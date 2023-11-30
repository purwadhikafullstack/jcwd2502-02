const db = require("./../models");
module.exports = {
    getBranchService: async () => {
        try {
            return await db.store_branch.findAll({ attributes: ['id', 'longitude', 'latitude', 'name', 'city_id'] })
        } catch (error) {
            return error
        }
    },
    getOneBranchService: async (params) => {
        try {
            const { id } = params
            return await db.store_branch.findOne({ where: { id }, attributes: ['name'] })
        } catch (error) {
            return error
        }
    },
    nearestBranchService: async (params) => {
        try {
            const { id } = params;
            const branch = db.store_branch.findOne({ where: { id } })
            return await db.product_stock.findAll({ include: [{ model: db.product, where: { isDeleted: 0 } }], where: { store_branch_id: id } })
        } catch (error) {
            return error
        }
    },
    getRecommendProductService: async (query, res) => {
        try {
            const { branchId } = query;
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
                limit: 10,
            });
            const result = res.json({
                products,
            });

            return result;
        } catch (error) {
            throw error;
        }
    },
}