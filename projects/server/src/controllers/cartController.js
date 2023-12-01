const db = require("./../models")
const responseHandler = require('../utils/responseHandler');
const { cartUserId, addToCart, itemDelete, deleteCartItem } = require('../services/cartService')

module.exports = {
    getCart: async (req, res, next) => {
        try {
            const cart = await cartUserId(req.dataToken)
            responseHandler(res, "Get Cart Success", cart)
        } catch (error) {
            next(error)
        }
    },
    addCart: async (req, res, next) => {
        try {
            const updatedCart = await addToCart(req.dataToken, req.query);
            responseHandler(res, "Item added to Cart", updatedCart.message, null, updatedCart.isError)
        } catch (error) {
            next(error)
        }
    },
    deleteItem: async (req, res, next) => {
        try {
            const updatedCart = await itemDelete(req.dataToken, req.params);
            responseHandler(res, "Delete Item Success", updatedCart)
        } catch (error) {
            next(error)
        }
    },
    deleteCartbyItem: async (req, res, next) => {
        try {
            const result = await deleteCartItem(req.dataToken, req.params);
            responseHandler(res, "Delete Item(s) Success", result)
        } catch (error) {
            next(error)
        }
    }
}