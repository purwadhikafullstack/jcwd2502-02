const db = require('./../models');
const { Op } = require('sequelize');

module.exports = {
    fetchProductSalesReport: async (req) => {
        try {
            let whereCondition = {};
            const {role, store_branch_id} = req.dataToken;
            const {sortHow, sortBy, productName, branch, startDate, endDate } = req.query;
            // if(role == "admin") {
            //     whereCondition.store_branch_id = store_branch_id
            // } else if (role == "superadmin") {
            //     whereCondition.store_branch_id = branch
            // }
            if(startDate && endDate) whereCondition.createdAt = {
                [Op.gte]: new Date(startDate), [Op.lte]: new Date(endDate + 'T23:59:59.999Z')
            }
            const data = await db.transaction_detail.findAll({
                // attributes: ["id", "name", "price", "quantity", "subtotal"],
                where: whereCondition,
                include: [
                    {
                    model: db.product,
                    attributes: ["name"],
                    include: [{
                        model: db.product_category,
                        attributes: ["name"]
                    }],
                    },
                    {
                        model: db.transactions,
                        attributes: ["store_branch_id"],
                        group: ["store_branch_id"]
                    }
                ],
                order: [
                    // ["product_category.name", "ASC"],
                    [db.transactions, "store_branch_id", "DESC"]
                ],
            })

            const quantityResult = await db.transaction_detail.findAll({
                attributes: [
                    'name',
                    [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'quantitySold']
                ],
                // include: [
                //     {
                //         model: db.transactions,
                //         where: {store_branch_id: 1},
                //         group: ["store_branch_id"]
                //     }
                // ],
                group: ['name']
            });

            const categorySold = await db.transaction_detail.findAll({
                // attributes: [
                //     [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQuantity']
                // ],
                include: [
                    {
                        model: db.transactions
                    },
                    {
                        model: db.product,
                        include: [{
                            model: db.product_category
                        }]
                    }
                ],
                group: ["name"]
            })


            // console.log(data);
            // const quantityPerProducts = data.reduce((quantity, item) => {
            //     const productName = item.product.name
            //     if (!quantity[productName]) {
            //         quantity[productName] = 0;
            //     }
            //     quantity[productName] += item.quantity;
            //     return quantity
            // }, {})
            // const quantityPerCategory = data.reduce((quantity, item) => {
            //     const categoryName = item.product.product_category.name;
            //     if (!quantity[categoryName]) {
            //         quantity[categoryName] = 0;
            //     }
            //     quantity[categoryName] += item.quantity;
            //     return quantity;
            // }, {})
            // console.log(quantityPerProducts, quantityPerCategory);
            // const name = Object.keys(quantityPerCategory)
            // const quantity = Object.values(quantityPerCategory)
            // console.log(name);

            const stockMovement = await db.stock_history.findAll({
                attributes: [
                    "id", "stock", "products_id", "store_branch_id"
                ],
            });

            return {
                quantityResult,
                categorySold
            }
        } catch (error) {
            return error;
        }
    }
}