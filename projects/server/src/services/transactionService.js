const axios = require('axios');
const { Op, literal } = require("sequelize");
const db = require("./../models");
const responseHandler = require("./../utils/responseHandler");

module.exports = {
    shippingOption: async (origin, destination, weight, courier) => {
        try {
            const apiKey = '43962da7ce0ba0c33a19a174b0bc4e88';
            const response = await axios.post(
                'https://api.rajaongkir.com/starter/cost/',
                { origin, destination, weight, courier },
                { headers: { 'key': apiKey } }
            );
            return response.data.rajaongkir.results;
        } catch (error) {
            throw error;
        }
    },

    create: async (userId, { subtotal, shipping_cost, discount, final_total, shipping_method, address }) => {
        try {
            const invoice = Date.now() + Math.round(Math.random() * 1E9);
            const transaction = await db.transactions.create({
                invoice,
                subtotal,
                shipping_cost,
                discount,
                final_total,
                shipping_method,
                address,
                user_id: userId,
                status: "pending"
            });

            const inMyCart = await db.cart.findAll({
                include: [
                    {
                        model: db.product,
                        required: true,
                    },
                ], where: { user_id: userId }
            });

            for (const product of inMyCart) {
                await db.transaction_detail.create({
                    id_product: product.product.id,
                    name: product.product.name,
                    price: product.product.price,
                    quantity: product.quantity,
                    subtotal: product.subtotal,
                    transaction_id: transaction.id
                });
            }

            await db.cart.destroy({ where: { user_id: userId } });

            const transactionDetails = await db.transaction_detail.findAll({ where: { transaction_id: transaction.id } });

            return transactionDetails;
        } catch (error) {
            throw error;
        }
    },

    filteredAllOrder: async ({ invoice, status, createdAt, page }) => {
        try {
            const limit = 6;
            const whereClause = {};
            if (invoice) whereClause.invoice = { [Op.like]: `%${invoice}%` };
            if (status) whereClause.status = status;
            if (createdAt) whereClause.createdAt = literal(`DATE(createdAt) = '${createdAt}'`);

            const totalRecords = await db.transactions.count({ where: whereClause });
            const maxPages = Math.ceil(totalRecords / limit);
            const offset = (page - 1) * limit;

            const orders = await db.transactions.findAll({
                where: whereClause,
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });

            return {
                orders,
                maxPages,
            };
        } catch (error) {
            throw error;
        }
    },
};

