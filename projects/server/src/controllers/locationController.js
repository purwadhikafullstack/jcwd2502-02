const db = require('../models');
const fs = require('fs').promises;
const responseHandler = require("./../utils/responseHandler")
const axios = require('axios');

module.exports = {
    getProvince: async (req, res, next) => {
        try {
            const province = await db.province.findAll()
            responseHandler(res, "Get Province Success", province)
        } catch (error) {
            next(error)
        }
    },

    getCity: async (req, res, next) => {
        try {
            const city = await db.city.findAll()
            responseHandler(res, "Get City Success", city)
        } catch (error) {
            next(error)
        }
    },

    getCitybyProv: async (req, res, next) => {
        try {
            const { id } = req.params
            const cities = await db.city.findAll({ where: { province_id: id } })
            responseHandler(res, "Get Cities Success", cities)
        } catch (error) {
            next(error)
        }
    },

    getAddress: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
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
            },)
            responseHandler(res, "Get Address Success", userAddress);
        } catch (error) {
            next(error)
        }
    },

    getAddressById: async (req, res, next) => {
        try {
            const { id } = req.params;
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
            responseHandler(res, "Get Address Success", address);

        } catch (error) {
            next(error)
        }
    },

    addAddress: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const { name, address, city_id, isPrimary } = req.body

            if (isPrimary == "true") {
                const checkMainAddress = await db.user_address.findOne({ where: { user_id: id, isPrimary: "true" } })

                if (checkMainAddress) {

                    const isMainId = checkMainAddress.dataValues.id
                    await db.user_address.update({ isPrimary: "false" }, { where: { id: isMainId } })

                    const createAddress = await db.user_address.create({ address, user_id: id, name, city_id, isPrimary })

                    const findCity = await db.city.findOne({ where: { id: city_id } })
                    const provinceId = findCity.dataValues.province_id
                    const findProvince = await db.province.findOne({ where: { id: provinceId } })
                    const provinceName = findProvince.dataValues.name
                    const cityName = findCity.dataValues.name

                    const query = `${address}, ${cityName}, ${provinceName}`;
                    const apiKey = 'f45e314fcd39480d852216b132606295';
                    const geocoding = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}`;

                    const response = await axios.get(geocoding);

                    if (response.status === 200) {
                        const latitude = response.data.results[0].geometry.lat;
                        const longitude = response.data.results[0].geometry.lng;

                        await db.user_address.update({ longitude, latitude }, { where: { id: createAddress.id } })

                        const finalAddress = await db.user_address.findOne({ where: { id: createAddress.id } })

                        responseHandler(res, "Get Address Success", finalAddress);
                    } else {

                        responseHandler(res, "Error: Geocoding failed");
                    }
                }

                else {
                    const createAddress = await db.user_address.create({ address, user_id: id, name, city_id, isPrimary })

                    const findCity = await db.city.findOne({ where: { id: city_id } })
                    const provinceId = findCity.dataValues.province_id
                    const findProvince = await db.province.findOne({ where: { id: provinceId } })
                    const provinceName = findProvince.dataValues.name
                    const cityName = findCity.dataValues.name

                    const query = `${address}, ${cityName}, ${provinceName}`;
                    const apiKey = 'f45e314fcd39480d852216b132606295';
                    const geocoding = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}`;

                    const response = await axios.get(geocoding);

                    if (response.status === 200) {
                        const latitude = response.data.results[0].geometry.lat;
                        const longitude = response.data.results[0].geometry.lng;

                        await db.user_address.update({ longitude, latitude }, { where: { id: createAddress.id } })

                        const finalAddress = await db.user_address.findOne({ where: { id: createAddress.id } })

                        responseHandler(res, "Get Address Success", finalAddress);
                    } else {

                        responseHandler(res, "Error: Geocoding failed");
                    }
                }
            }


            else if (isPrimary == "false") {
                const createAddress = await db.user_address.create({ address, user_id: id, name, city_id, isPrimary })

                const findCity = await db.city.findOne({ where: { id: city_id } })
                const provinceId = findCity.dataValues.province_id
                const findProvince = await db.province.findOne({ where: { id: provinceId } })
                const provinceName = findProvince.dataValues.name
                const cityName = findCity.dataValues.name

                const query = `${address}, ${cityName}, ${provinceName}`;
                const apiKey = 'f45e314fcd39480d852216b132606295';
                const geocoding = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}`;

                const response = await axios.get(geocoding);

                if (response.status === 200) {
                    const latitude = response.data.results[0].geometry.lat;
                    const longitude = response.data.results[0].geometry.lng;

                    await db.user_address.update({ longitude, latitude }, { where: { id: createAddress.id } })

                    const finalAddress = await db.user_address.findOne({ where: { id: createAddress.id } })

                    responseHandler(res, "Get Address Success", finalAddress);
                } else {

                    responseHandler(res, "Error: Geocoding failed");
                }
            }


        } catch (error) {
            next(error)
        }
    },

    changeMainAddress: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const { addressId } = req.params;

            const checkMainAddress = await db.user_address.findOne({ where: { user_id: id, isPrimary: "true" } })


            if (checkMainAddress) {
                const isMainId = checkMainAddress.dataValues.id
                await db.user_address.update({ isPrimary: "false" }, { where: { id: isMainId } })
                await db.user_address.update({ isPrimary: "true" }, { where: { id: addressId } })
            }

            else {
                await db.user_address.update({ isPrimary: "true" }, { where: { id: addressId } })

            }

            const checkMainAddress2 = await db.user_address.findOne({ where: { user_id: id, isPrimary: "true" } })


            responseHandler(res, "Change Main Address Success", checkMainAddress2);


        } catch (error) {
            next(error)
        }
    },

    deleteAddress: async (req, res, next) => {
        try {
            const { id } = req.params;
            await db.user_address.update({ isDeleted: 1 }, { where: { id } });
            responseHandler(res, "Delete Success", id);
        } catch (error) {
            next(error)
        }
    },

    updateAddress: async (req, res, next) => {
        try {

            const { idAddress } = req.params
            const { name, address, city_id } = req.body


            const addressPatch = await db.user_address.update({ address, name, city_id }, { where: { id: idAddress } })

            const findCity = await db.city.findOne({ where: { id: city_id } })
            const cityName = findCity.dataValues.name
            const provinceId = findCity.dataValues.province_id
            const findProvince = await db.province.findOne({ where: { id: provinceId } })
            const provinceName = findProvince.dataValues.name

            const query = `${address}, ${cityName}, ${provinceName}`;
            const apiKey = 'f45e314fcd39480d852216b132606295';
            const geocoding = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}`;

            const response = await axios.get(geocoding);

            console.log(response);

            if (response.status === 200) {
                const latitude = response.data.results[0].geometry.lat;
                const longitude = response.data.results[0].geometry.lng;

                await db.user_address.update({ longitude, latitude }, { where: { id: idAddress } })

                const finalAddress = await db.user_address.findOne({ where: { id: idAddress } })

                responseHandler(res, "Get Address Success", finalAddress);
            } else {

                responseHandler(res, "Error: Geocoding failed");
            }

        } catch (error) {
            next(error)
        }
    }

}