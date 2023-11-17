const db = require("./../models");
module.exports = {
    getBranchService: async () => {
        try {
            return await db.store_branch.findAll({ attributes: ['id', 'longitude', 'latitude', 'name', 'city_id'] })
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
}