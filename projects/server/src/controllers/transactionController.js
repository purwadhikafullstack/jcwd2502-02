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
}
