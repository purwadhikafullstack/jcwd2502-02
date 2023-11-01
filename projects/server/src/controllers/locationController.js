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

    addAddress: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const { name, address, city_id } = req.body

            //db.create dulu untuk addressnya dengan data yg ada

            const createAddress = await db.user_address.create({ address, user_id: id, name, city_id })

            const findCity = await db.city.findOne({ where: { id: city_id } })
            const provinceId = findCity.dataValues.province_id
            const findProvince = await db.province.findOne({ where: { id: provinceId } })
            const provinceName = findProvince.dataValues.name
            const cityName = findCity.dataValues.name

            //gabung address + city name + province name untuk forward geocoding
            const query = `${address}, ${cityName}, ${provinceName}`;
            const apiKey = 'f45e314fcd39480d852216b132606295'; // Replace with your OpenCage Data API key
            const geocoding = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}`;

            const response = await axios.get(geocoding);

            if (response.status === 200) {
                const latitude = response.data.results[0].geometry.lat;
                const longitude = response.data.results[0].geometry.lng;

                await db.user_address.update({ longitude, latitude }, { where: { id: createAddress.id } })

                const finalAddress = await db.user_address.findOne({ where: { id: createAddress.id } })

                responseHandler(res, "Get Address Success", finalAddress);
            } else {
                // Handle errors, e.g., when no results are found
                responseHandler(res, "Error: Geocoding failed");
            }

        } catch (error) {
            next(error)
        }
    }

}