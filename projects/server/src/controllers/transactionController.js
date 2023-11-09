const db = require("./../models")
const responseHandler = require("./../utils/responseHandler")
const { Sequelize } = require("sequelize");
const axios = require('axios');

module.exports = {
    getShippingOption: async (req, res, next) => {
        try {
            const { origin, destination, weight, courier } = req.body
            const apiKey = '43962da7ce0ba0c33a19a174b0bc4e88';
            const response = await axios.post(`https://api.rajaongkir.com/starter/cost/`, { origin, destination, weight, courier }, { headers: { 'key': apiKey } }
            )
            console.log(origin);
            console.log(destination);
            console.log(weight);
            console.log(courier);
            console.log(response.data.rajaongkir);
            responseHandler(res, "Get Shipping Option Success", response.data.rajaongkir.results)
        } catch (error) {
            next(error);
        }
    },

    createOrder: async (req, res, next) => {
        try {
            const { id } = req.dataToken;

            const { subtotal, shipping_cost, discount, final_total, shipping_method } = req.body
            const invoice = Date.now() + Math.round(Math.random() * 1E9)
            const transaction = await db.transactions.create({ invoice, subtotal, shipping_cost, discount, final_total, shipping_method, user_id: id, status: "pending" })

            const inMyCart = await db.cart.findAll({
                include: [
                    {
                        model: db.product,
                        required: true,
                    },
                ], where: { user_id: id }
            })

            for (const product of inMyCart) {
                await db.transaction_detail.create({
                    id_product: product.product.id,
                    name: product.product.name,
                    price: product.product.price,
                    quantity: product.quantity,
                    subtotal: product.subtotal,
                    transaction_id: transaction.id
                })
            }

            await db.cart.destroy({ where: { user_id: id } })

            const transactionDetails = await db.transaction_detail.findAll({ where: { transaction_id: transaction.id } })

            responseHandler(res, "Get Shipping Option Success", transactionDetails)


        } catch (error) {
            next(error)
        }
    }
}
