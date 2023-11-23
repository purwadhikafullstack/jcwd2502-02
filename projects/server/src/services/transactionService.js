const axios = require('axios');
const { Op, literal, Sequelize } = require("sequelize");
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
            console.log(req.dataToken);
            const { role, store_branch_id } = req.dataToken
            console.log(role);
            const { username, sort, days, page } = req.query;
            console.log(sort);
            let whereClause = {};
            let whereUsername = {};
            if (role == "admin") {
                whereClause.store_branch_id = store_branch_id
            }
            if (username) {
                whereUsername.username = { [Op.like]: `%${username}%` };
            }
            if (days) {
                whereClause.createdAt = { [Op.gte]: new Date(new Date() - days * 24 * 60 * 60 * 1000) }
            }
            console.log(whereClause);
            const limit = 6;
            const totalRecords = await db.transactions.count({ where: whereClause })
            console.log(`cek 1`);
            const maxPages = Math.ceil(totalRecords / limit);
            const offset = (page - 1) * limit;
            const data = await db.transactions.findAll({
                attributes: ["id", "subtotal", "shipping_cost", "final_total", "status", 'createdAt', "store_branch_id"],
                include: [{
                    model: db.user,
                    attributes: ["username"],
                    where: whereUsername
                },
                {
                    model: db.store_branch,
                    attributes: ["name"],
                }],
                order: [['createdAt', sort]],
                limit,
                offset
            })
            return {
                maxPages,
                data
            }
        } catch (error) {
            return error;
        }
    },

    filteredProductTransaction: async (req) => {
        try {
            let whereClause = {};
            let nameClause = {};
            console.log(req.dataToken);
            const { role, store_branch_id } = req.dataToken;
            const { username, sort, page, branch, startdate, enddate, sortby, transactionstatus } = req.query;
            if(transactionstatus == 2) {
                whereClause.status = 'Complete'
            } else if (transactionstatus == 3) {
                whereClause.status = {[Op.notIn]: ['Complete', 'Canceled']}
            } else {
                whereClause.status = {[Op.notIn]: ['Canceled']}
            }
            if (role === "admin") {
                whereClause.store_branch_id = store_branch_id
            } else if (role === "superadmin") {
                if (branch) whereClause.store_branch_id = branch
            }
            if (username) nameClause.username = { [Op.like]: `%${username}%` }
            if (startdate && enddate) {
                whereClause.createdAt = {
                    [Op.gte]: new Date(startdate),
                    [Op.lte]: new Date(enddate + 'T23:59:59.999Z'), // Set the end of the day for date2
                }
            }
            const limit = 6;
            const totalRecords = await db.transactions.count({ where: whereClause });
            const maxPages = Math.ceil(totalRecords / limit);
            const offset = (page - 1) * limit;
            const data = await db.transactions.findAll({
                attributes: ["id", "invoice", "subtotal", "shipping_cost", "final_total", "shipping_method", "createdAt", "status", "store_branch_id", "user_id"],
                where: whereClause,
                include: [{
                    model: db.transaction_detail,
                    attributes: ["name", "price", "quantity", "price", "subtotal", "discount_value", "products_id"],
                    include: [{
                        model: db.product,
                        attributes: ["image"]
                    }]
                },
                {
                    model: db.store_branch,
                    attributes: ["name"]
                },
                {
                    model: db.user,
                    attributes: ["username"],
                    where: nameClause
                }
                ],
                order: [[`${sortby}`, sort]],
                limit,
                offset
            })
            return {
                maxPages,
                data
            }
        } catch (error) {
            return error;
        }
    },
    getOverallData: async (req) => {
        try {
            let whereCondition = {};
            console.log(req.dataToken);
            const {branch, startdate, enddate} = req.query;
            const { role, store_branch_id } = req.dataToken;
            if (startdate && enddate) {
                whereCondition.createdAt = {
                    [Op.gte]: new Date(startdate),
                    [Op.lte]: new Date(enddate + 'T23:59:59.999Z'),
                }
            }
            if (role === "admin") {
                whereCondition.store_branch_id = store_branch_id
            } else if (role === "superadmin") {
                if (branch) whereCondition.store_branch_id = branch
            }
            whereCondition.status = {[db.Sequelize.Op.not]: 'Canceled'}
            console.log(whereCondition);
            const data = await db.transactions.findAll({
                where: whereCondition,
                attributes: ["status", "subtotal", "final_total", "store_branch_id", "createdAt"],
                include: [{
                    model: db.store_branch,
                    attributes: ["name"]
                }]
            })
            const completedOrders = data.filter(item => item.status === 'Complete');
            const onGoingOrders = data.filter(item => item.status !== 'Complete');
            const completedOrderCount = completedOrders.length
            const completedOrderRevenue = completedOrders.reduce((total, transaction) => {
                return total + transaction.final_total
            }, 0)
            const onGoingOrderRevenue = onGoingOrders.reduce((total, transaction) => {
                return total + transaction.final_total
            }, 0)
            const totalOrders = data.length
            return {
                completedOrderRevenue,
                completedOrderCount,
                onGoingOrderRevenue,
                totalOrders
            }
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