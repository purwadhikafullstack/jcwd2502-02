const db = require("./../models");
module.exports = {
    getBranchService: async () => {
        try {
            return await db.store_branch.findAll({
                attributes: ['id', 'longitude', 'latitude', 'name']
            })
        } catch (error) {
            return error
        }
    },
    nearestBranchService1: async (id) => {
        try {
            return await db.store_branch.findOne(
                {
                    where: { id }
                }
            )
        } catch (error) {
            return error
        }
    },
    nearestBranchService2: async (id) => {
        try {
            return await db.product_stock.findAll({
                include: [{
                    model: db.product
                }],

                where: {
                    store_branch_id: id
                }
            })
        } catch (error) {
            return error
        }
    }
}