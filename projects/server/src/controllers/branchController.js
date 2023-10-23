const db = require('../models');
const fs = require('fs').promises;

module.exports = {
    getbranch: async (req, res, next) => {
        try {
            const allBranch = await db.store_branch.findAll({
                attributes: ['id', 'longitude', 'latitude']
            })
            res.status(201).send({
                isError: false,
                message: "Get All Branch Success",
                data: allBranch
            })
        } catch (error) {
            next(error)
        }
    },

    nearestBranch: async (req, res, next) => {
        try {
            const { id } = req.params;
            const branch = await db.store_branch.findOne(
                {
                    where: { id }
                }
            )

            const product = await db.product_stock.findAll({
                include: [{
                    model: db.product
                }],

                where: {
                    store_branch_id: id
                }
            })

            res.status(201).send({
                isError: false,
                message: "Get Nearest Branch Success",
                data: product
            })
        } catch (error) {
            next(error)
        }
    }
}