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

    create: async (userId, { subtotal, shipping_cost, discount, final_total, shipping_method, address, branchId, total_weight, discount_coupon, coupon_id, ownedCouponId, coupon_name }) => {
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
                store_branch_id: branchId,
                status: "pending",
                total_weight: total_weight,
                discount_coupon,
                coupon_id,
                coupon_name
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
                    products_id: product.product.id,
                    name: product.product.name,
                    price: product.product.final_price,
                    quantity: product.quantity,
                    subtotal: product.subtotal,
                    transaction_id: transaction.id,
                    discount_id: product.product.discount_id,
                    discount_value: product.product.discount_value,
                    weight: product.product.weight,
                    real_price: product.product.price
                });
            }

            await db.cart.destroy({ where: { user_id: userId } });
            if (ownedCouponId) {
                await db.owned_coupon.update({ isValid: "false" }, { where: { id: ownedCouponId } })
            }
            const transactionDetails = await db.transaction_detail.findAll({ where: { transaction_id: transaction.id } });

            return transaction;
        } catch (error) {
            throw error;
        }
    },

    filteredAllOrder: async ({ invoice, status, createdAt, page, branchId }) => {
        try {
            const limit = 6;
            const whereClause = {};
            if (invoice) whereClause.invoice = { [Op.like]: `%${invoice}%` };
            if (status) whereClause.status = status;
            if (branchId) whereClause.store_branch_id = branchId;
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

    filteredTransactionsData: async (req) => {
        try {


        } catch (error) {
            return error;
        }
    },
    getUserCouponService: async (dataToken) => {
        try {
            const { id } = dataToken;
            return await db.owned_coupon.findAll({ where: { user_id: id, isValid: "true" } })
        } catch (error) {
            return error
        }
    }
};

