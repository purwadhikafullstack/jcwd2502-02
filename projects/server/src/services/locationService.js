const db = require('../models');
const fs = require('fs').promises;
const axios = require('axios');
module.exports = {
    getAddressService: async (dataToken) => {
        try {
            const { id } = dataToken;
            const userAddress = await db.user_address.findAll({
                include: [
                    {
                        model: db.city,
                        attributes: ['name'],
                        include: [
                            {
                                model: db.province,
                                attributes: ['name']
                            }
                        ]
                    },
                ],
                where: { user_id: id, isDeleted: 0 },
                order: [
                    [db.sequelize.literal('isPrimary = "true" DESC')],
                    ['createdAt', 'DESC'],
                ],
            },)
            return userAddress
        } catch (error) {
            return error
        }
    },
    addressPaginationService: async (dataToken, params, res) => {
        try {
            const { id } = dataToken;
            const { page } = params;
            const totalRecords = await db.user_address.count({ where: { user_id: id, isDeleted: 0 } });
            const limit = 6;
            const maxPages = Math.ceil(totalRecords / limit);
            const offset = (page - 1) * limit;
            const userAddress = await db.user_address.findAll({
                include: [
                    {
                        model: db.city,
                        attributes: ['name'],
                        include: [
                            {
                                model: db.province,
                                attributes: ['name']
                            }
                        ]
                    },
                ],
                where: { user_id: id, isDeleted: 0 },
                order: [
                    [db.sequelize.literal('isPrimary = "true" DESC')],
                    ['createdAt', 'DESC'],
                ],
                limit,
                offset,
            });
            const result = res.json({
                userAddress,
                maxPages,
            });
            return result;
        } catch (error) {
            return error
        }
    },
    getMainAddressService: async (dataToken) => {
        try {
            const { id } = dataToken
            const mainAddress = await db.user_address.findOne({
                include: [
                    {
                        model: db.city,
                        attributes: ['name'],
                        include: [
                            {
                                model: db.province,
                                attributes: ['name']
                            }
                        ]
                    },
                ],
                where: { user_id: id, isPrimary: 'true', isDeleted: 0 }
            })
            return mainAddress
        } catch (error) {
            return error
        }
    },
    getAddressByIdService: async (params) => {
        try {
            const { id } = params;
            const address = await db.user_address.findOne({
                include: [
                    {
                        model: db.city,
                        attributes: ['name', 'id'],
                        include: [
                            {
                                model: db.province,
                                attributes: ['name', 'id']
                            }
                        ]
                    },
                ], where: { id }
            })
            return address
        } catch (error) {
            return error
        }
    },
    changeMainAddressService: async (dataToken, params) => {
        try {
            const { id } = dataToken;
            const { addressId } = params;
            const checkMainAddress = await db.user_address.findOne({ where: { user_id: id, isPrimary: "true" } })
            if (checkMainAddress) {
                const isMainId = checkMainAddress.dataValues.id
                await db.user_address.update({ isPrimary: "false" }, { where: { id: isMainId } })
                await db.user_address.update({ isPrimary: "true" }, { where: { id: addressId } })
                await db.cart.destroy({ where: { user_id: id } })
            }
            else {
                await db.user_address.update({ isPrimary: "true" }, { where: { id: addressId } })
                await db.cart.destroy({ where: { user_id: id } })
            }
            const checkMainAddress2 = await db.user_address.findOne({ where: { user_id: id, isPrimary: "true" } })
            return checkMainAddress2
        } catch (error) {
            return error
        }
    }
}