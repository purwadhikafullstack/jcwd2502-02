const db = require('../models');
const fs = require('fs').promises;
const responseHandler = require("./../utils/responseHandler")
const axios = require('axios');

module.exports = {
    getProvince: async (req, res, next) => {
        try {
            const provinceId = await axios.get(`https://api.rajaongkir.com/starter/province`, {
                headers: { 'key': '43962da7ce0ba0c33a19a174b0bc4e88' }
            })
            const provinceData = provinceId.data; // Extract the relevant data

            responseHandler(res, {
                message: "Get province success",
                data: provinceData
            })
        } catch (error) {
            next(error)
        }
    },

    getCity: async (req, res, next) => {
        try {
            const cityId = await axios.get(`https://api.rajaongkir.com/starter/city`, {
                headers: { 'key': '43962da7ce0ba0c33a19a174b0bc4e88' }
            })
            const cityData = cityId.data; // Extract the relevant data (results)

            responseHandler(res, {
                message: "Get province success",
                data: cityData
            })
        } catch (error) {
            next(error)
        }
    },

}