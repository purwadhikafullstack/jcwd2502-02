const db = require("./../models")
const responseHandler = require("./../utils/responseHandler")
const { Sequelize } = require("sequelize");
const axios = require('axios');
const { Op, literal } = require("sequelize");
const { shippingOption, create, filteredAllOrder, filteredTransactionsData, filteredProductTransaction, getUserCouponService, getOverallData } = require('../services/transactionService')
const { deleteFiles } = require("./../helper/deleteFiles")
const { sequelize } = require('./../models')


module.exports = {
    getShippingOption: async (req, res, next) => {
        try {
            const { origin, destination, weight, courier } = req.body;
            const shippingOptions = await shippingOption(origin, destination, weight, courier);
            responseHandler(res, "Get Shipping Option Success", shippingOptions);
        } catch (error) {
            next(error);
        }
    },
    createOrder: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const orderDetails = req.body;
            const transactionDetails = await create(id, orderDetails);
            responseHandler(res, "Create Order Success", transactionDetails);
        } catch (error) {
            next(error);
        }
    },
    getUserOrder: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const { transactionId } = req.params;
            const getOrder = await db.transactions.findOne({
                include: [
                    {
                        model: db.transaction_detail,
                        required: true,
                        include: [{
                            model: db.product
                        }]
                    },
                    {
                        model: db.user, attributes: ["username"]
                    },
                    {
                        model: db.store_branch, attributes: ["name"]
                    },

                ],
                where: { user_id: id, id: transactionId }
            });
            responseHandler(res, "Get Order Success", getOrder);
        } catch (error) {
            next(error);
        }
    },
    getUserOrderForAdmin: async (req, res, next) => {
        try {
            const { role, store_branch_id } = req.dataToken;
            const { transactionId } = req.params;
            if (role === "admin" || role === "superadmin") {
                const getOrder = await db.transactions.findOne({
                    include: [
                        {
                            model: db.transaction_detail,
                            required: true,
                            include: [{
                                model: db.product
                            }]
                        },
                        {
                            model: db.user, attributes: ["username"]
                        },
                        {
                            model: db.store_branch, attributes: ["name"]
                        },
                    ],
                    where: { id: transactionId }
                });
                responseHandler(res, "Get Order Success", getOrder);
            }
        } catch (error) {
            next(error)
        }
    },
    getAllUserOrders: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const { invoice, status, createdAt, page, startdate, enddate, sort, sortby, branchId } = req.query;
            const limit = 6;
            const whereClause = {};
            if (invoice) whereClause.invoice = { [Op.like]: `%${invoice}%` };
            if (branchId) whereClause.store_branch_id = branchId;
            if (status) whereClause.status = status;
            if (startdate && !enddate) {
                whereClause.createdAt = { [Op.gte]: new Date(startdate), [Op.lte]: new Date(startdate + 'T23:59:59.999Z') }
            }
            if (startdate && enddate) {
                whereClause.createdAt = {
                    [Op.gte]: new Date(startdate),
                    [Op.lte]: new Date(enddate + 'T23:59:59.999Z'), // Set the end of the day for date2
                }
            }
            const totalRecords = await db.transactions.count({ where: { ...whereClause, user_id: id } });
            const maxPages = Math.ceil(totalRecords / limit);
            const offset = (page - 1) * limit;
            const orders = await db.transactions.findAll({
                where: { ...whereClause, user_id: id },
                limit,
                offset,
                order: [[`${sortby}`, sort]],
                include: [{ model: db.store_branch, attributes: ["name"] }, { model: db.transaction_detail, include: [{ model: db.product }] }]
            });
            const result = res.json({
                orders,
                maxPages,
            });
            // responseHandler(res, "Get Orders Success", result);
        } catch (error) {
            next(error);
        }
    },

    getOrders: async (req, res, next) => {
        try {
            const { invoice, status, createdAt, page, startdate, enddate, sort, sortby, branchId } = req.query;
            const limit = 6;
            const whereClause = {};
            if (invoice) whereClause.invoice = { [Op.like]: `%${invoice}%` };
            if (status) whereClause.status = status;
            if (branchId) whereClause.store_branch_id = branchId;
            if (startdate && !enddate) {
                whereClause.createdAt = { [Op.gte]: new Date(startdate), [Op.lte]: new Date(startdate + 'T23:59:59.999Z') }
            }
            if (startdate && enddate) {
                whereClause.createdAt = {
                    [Op.gte]: new Date(startdate),
                    [Op.lte]: new Date(enddate + 'T23:59:59.999Z'), // Set the end of the day for date2
                }
            }
            const totalRecords = await db.transactions.count({ where: { ...whereClause } });
            const maxPages = Math.ceil(totalRecords / limit);
            const offset = (page - 1) * limit;
            const orders = await db.transactions.findAll({
                where: { ...whereClause },
                limit,
                offset,
                order: [[`${sortby}`, sort]],
                include: [{ model: db.store_branch, attributes: ["name"] }, { model: db.transaction_detail, include: [{ model: db.product }] }]
            });
            const result = res.json({
                orders,
                maxPages,
            });
        } catch (error) {
            next(error);
        }
    },
    uploadPayment: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const { transactionId } = req.params;
            const upload = await db.transactions.update({
                payment_proof: req.files.image[0].filename,
                status: "waiting for payment approval"
            }, { where: { id: transactionId, user_id: id } })
            const transaction = await db.transactions.findOne({
                where: { id: transactionId }
            })
            responseHandler(res, "Upload Payment Proof Success", transaction);
        } catch (error) {
            next(error)
        }
    },
    cancelOrder: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const { transactionId } = req.params;
            const upload = await db.transactions.update({
                status: "canceled"
            }, { where: { id: transactionId, user_id: id } })
            const transaction = await db.transactions.findOne({
                where: { id: transactionId }
            })
            responseHandler(res, "Upload Payment Proof Success", transaction);
        } catch (error) {
            next(error)
        }
    },
    adminCancelOrder: async (req, res, next) => {
        try {
            const { role } = req.dataToken;
            const { transactionId } = req.params;
            if (role === "admin" || role === "superadmin") {
                const upload = await db.transactions.update({
                    status: "canceled"
                }, { where: { id: transactionId } })
                const transaction = await db.transactions.findOne({
                    where: { id: transactionId }
                })
                responseHandler(res, "Cancel Order Success", transaction);
            }
        } catch (error) {
            next(error)
        }
    },
    adminDeclinePaymentOrder: async (req, res, next) => {
        try {
            const { role } = req.dataToken;
            const { transactionId } = req.params;
            if (role === "admin" || role === "superadmin") {
                const paymentProof = await db.transactions.findOne({
                    where: { id: transactionId }
                })
                const oldImage = paymentProof.payment_proof
                deleteFiles({ image: [oldImage] })
                const upload = await db.transactions.update({
                    status: "pending", payment_proof: null
                }, { where: { id: transactionId } })

                const transaction = await db.transactions.findOne({
                    where: { id: transactionId }
                })
                responseHandler(res, "Cancel Order Success", transaction);
            }
        } catch (error) {
            next(error)
        }
    },
    adminApproveOrder: async (req, res, next) => {
        try {
            const { role } = req.dataToken;
            const { transactionId } = req.params;
            if (role === "admin" || role === "superadmin") {
                const getOrder = await db.transactions.findOne({
                    include: [
                        {
                            model: db.transaction_detail
                        },
                    ],
                    where: { id: transactionId }
                });
                const branchId = getOrder.store_branch_id
                const details = getOrder.transaction_details
                for (const product of details) {
                    const stocks = await db.product_stock.findOne({
                        where: { products_id: product.products_id, store_branch_id: branchId }
                    })
                    if (stocks.stock >= product.quantity) {
                        await db.product_stock.update({
                            stock: stocks.stock - product.quantity,
                            booked_stock: stocks.booked_stock + product.quantity
                        }, { where: { products_id: product.products_id, store_branch_id: branchId } })
                        // await db.stock_history.create({
                        //     stock: product.quantity, products_id: product.products_id, store_branch_id: branchId, description: "Sales"
                        //     //jangan lupa tambahin transaction_id
                        // })

                    } else if (stocks.stock < product.quantity) {
                        throw { message: "Stock is Not Enough / Unavailable" }
                    }
                }
                await db.transactions.update({
                    status: "Payment Approved"
                }, { where: { id: transactionId } })
                const result = await db.transactions.findOne({
                    include: [
                        {
                            model: db.transaction_detail
                        },
                    ],
                    where: { id: transactionId }
                });
                responseHandler(res, "Approve Order Success", result);
            }
        } catch (error) {
            next(error)
        }
    },

    userCompleteOrder: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const { transactionId } = req.params;
            const upload = await db.transactions.update({
                status: "Complete"
            }, { where: { id: transactionId, user_id: id } })
            const transaction = await db.transactions.findAll({
                where: { user_id: id, status: "Complete" }
            })
            const numberOfCompleteTransactions = transaction.length;
            const coupon2 = await db.coupon.findOne({ where: { id: 2 } })
            const coupon3 = await db.coupon.findOne({ where: { id: 3 } })
            const conditionCoupon2 = (numberOfCompleteTransactions) % 10 === 0
            const conditionCoupon3 = (numberOfCompleteTransactions) % 3 === 0
            if (conditionCoupon3) {
                const removeEventQuery3 = `CREATE EVENT remove_event_freeongkir_${transactionId} ON SCHEDULE AT NOW() DO BEGIN DROP EVENT IF EXISTS gift_coupon_freeongkir_for_transaction_${transactionId}; END`;
                const createCoupon3 = `CREATE EVENT create_coupon_freeongkir_${transactionId} ON SCHEDULE AT NOW() DO BEGIN INSERT INTO owned_coupons (isValid, user_id, coupon_id, coupon_value, coupon_name) VALUES ("true",${id}, ${coupon3.id}, ${coupon3.amount}, "${coupon3.name}"); END`;
                await db.sequelize.query(removeEventQuery3);
                await db.sequelize.query(createCoupon3);
            } if (conditionCoupon2) {
                const removeEventQuery2 = `CREATE EVENT remove_event_potonganharga_${transactionId} ON SCHEDULE AT NOW() DO BEGIN DROP EVENT IF EXISTS gift_coupon_potonganharga_for_transaction_${transactionId}; END`;
                const createCoupon2 = `CREATE EVENT create_coupon_potonganharga_${transactionId} ON SCHEDULE AT NOW() DO BEGIN INSERT INTO owned_coupons (isValid, user_id, coupon_id, coupon_value, coupon_name) VALUES ("true",${id}, ${coupon2.id}, ${coupon2.amount}, "${coupon2.name}"); END`;
                await db.sequelize.query(removeEventQuery2);
                await db.sequelize.query(createCoupon2);
            } if (!conditionCoupon2 && !conditionCoupon3) {
                const removeAutoComplete = `CREATE EVENT remove_complete_transaction_${transactionId} ON SCHEDULE AT NOW() DO BEGIN DROP EVENT IF EXISTS complete_transaction_${transactionId}; END`;
                await db.sequelize.query(removeAutoComplete);
            }
            responseHandler(res, "Upload Payment Proof Success", transaction);
        } catch (error) {
            next(error)
        }
    },
    adminSendOrder: async (req, res, next) => {

        try {
            const { role } = req.dataToken;
            const { transactionId } = req.params;
            if (role === "admin" || role === "superadmin") {
                const getOrder = await db.transactions.findOne({
                    include: [
                        {
                            model: db.transaction_detail
                        },
                    ],
                    where: { id: transactionId }
                });
                const branchId = getOrder.store_branch_id
                const details = getOrder.transaction_details
                for (const product of details) {
                    const stocks = await db.product_stock.findOne({
                        where: { products_id: product.products_id, store_branch_id: branchId }
                    })
                    if (stocks.booked_stock >= product.quantity) {
                        await db.product_stock.update({
                            booked_stock: stocks.booked_stock - product.quantity
                        }, { where: { products_id: product.products_id, store_branch_id: branchId } })
                        await db.stock_history.create({
                            stock: product.quantity, products_id: product.products_id, store_branch_id: branchId, description: "Sales", transaction_id: transactionId
                        })
                    } else if (stocks.booked_stock < product.quantity) {
                        throw { message: "Stock is Not Enough / Unavailable" }
                    }
                }
                await db.transactions.update({
                    status: "Delivered"
                }, { where: { id: transactionId } })
                const result = await db.transactions.findOne({
                    include: [
                        {
                            model: db.transaction_detail
                        },
                    ],
                    where: { id: transactionId }
                });
                const userTotalTransactions = await db.transactions.count({
                    where: { user_id: getOrder.user_id, status: "Complete" }
                });
                const coupon2 = await db.coupon.findOne({ where: { id: 2 } });
                const coupon3 = await db.coupon.findOne({ where: { id: 3 } });
                const conditionCoupon2 = (userTotalTransactions + 1) % 10 === 0
                const conditionCoupon3 = (userTotalTransactions + 1) % 3 === 0
                if (conditionCoupon3) {
                    const giftCoupon3 = `CREATE EVENT gift_coupon_freeongkir_for_transaction_${transactionId} ON SCHEDULE AT date_add(NOW(), INTERVAL 14 DAY) DO BEGIN INSERT INTO owned_coupons (isValid, user_id, coupon_id, coupon_value, coupon_name)
                    VALUES ('true',${getOrder.user_id}, ${coupon3.id}, ${coupon3.amount}, '${coupon3.name}');
                    UPDATE transactions SET status = 'Complete' WHERE id = ${transactionId};
                    END`;
                    await db.sequelize.query(giftCoupon3);
                }
                if (conditionCoupon2) {
                    const giftCoupon2 = `CREATE EVENT gift_coupon_potonganharga_for_transaction_${transactionId} ON SCHEDULE AT date_add(NOW(), INTERVAL 14 DAY) DO BEGIN INSERT INTO owned_coupons (isValid, user_id, coupon_id, coupon_value, coupon_name)
                    VALUES ('true',${getOrder.user_id}, ${coupon2.id}, ${coupon2.amount}, '${coupon2.name}');
                    UPDATE transactions SET status = 'Complete' WHERE id = ${transactionId};
                    END`;
                    await db.sequelize.query(giftCoupon2);
                }
                if (!conditionCoupon2 && !conditionCoupon3) {
                    const autoComplete = `CREATE EVENT complete_transaction_${transactionId} ON SCHEDULE AT date_add(NOW(), INTERVAL 14 DAY) DO UPDATE transactions SET status = 'Complete' WHERE id = ${transactionId}`;
                    await db.sequelize.query(autoComplete);
                }
                responseHandler(res, "Send Order Success", result);
            }
        } catch (error) {
            next(error)
        }
    },
    adminCancelSendOrder: async (req, res, next) => {
        try {
            const { role } = req.dataToken;
            const { transactionId } = req.params;
            if (role === "admin" || role === "superadmin") {
                const getOrder = await db.transactions.findOne({
                    include: [
                        {
                            model: db.transaction_detail
                        },
                    ],
                    where: { id: transactionId }
                });
                const branchId = getOrder.store_branch_id
                const details = getOrder.transaction_details
                for (const product of details) {
                    const stocks = await db.product_stock.findOne({
                        where: { products_id: product.products_id, store_branch_id: branchId }
                    })
                    if (stocks.booked_stock >= product.quantity) {
                        await db.product_stock.update({
                            booked_stock: stocks.booked_stock - product.quantity, stock: stocks.stock + product.quantity
                        }, { where: { products_id: product.products_id, store_branch_id: branchId } })
                        await db.stock_history.create({
                            stock: product.quantity, products_id: product.products_id, store_branch_id: branchId, description: "Sales", transaction_id: transactionId
                        })
                        await db.stock_history.create({
                            stock: product.quantity, products_id: product.products_id, store_branch_id: branchId, description: "Cancel Delivery", transaction_id: transactionId
                        })
                    } else if (stocks.booked_stock < product.quantity) {
                        throw { message: "Stock is Not Enough / Unavailable" }
                    }
                }

                await db.transactions.update({
                    status: "canceled"
                }, { where: { id: transactionId } })
                const result = await db.transactions.findOne({
                    include: [
                        {
                            model: db.transaction_detail
                        },
                    ],
                    where: { id: transactionId }
                });
                responseHandler(res, "Cancel Order Success", result);
            }
        } catch (error) {
            next(error)
        }
    },

    transactionReportSalesData: async (req, res, next) => {
        try {
            const data = await filteredTransactionsData(req);
            responseHandler(res, "Get transaction datas", data)
        } catch (error) {
            next(error);
        }
    },

    transactionReportProductData: async (req, res, next) => {
        try {
            const data = await filteredProductTransaction(req);
            responseHandler(res, "product sales data fetched", data)
        } catch (error) {
            next(error);
        }
    },

    getOverallTransactionData: async (req, res, next) => {
        try {
            const data = await getOverallData(req);
            responseHandler(res, "fetching overall transactions data", data);
        } catch (error) {
            next(error);
        }
    },

    getUserCoupon: async (req, res, next) => {
        try {
            const coupon = await getUserCouponService(req.dataToken)
            responseHandler(res, "Get Owned User Coupon Success", coupon)
        } catch (error) {
            next(error)
        }
    }
}
