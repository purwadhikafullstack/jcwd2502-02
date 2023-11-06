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
            const updatedCart = await addToCart(req.dataToken, req.params);
            responseHandler(res, "Get Cart Success", updatedCart)
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
            const { id } = req.dataToken
            const { productId } = req.params
            const result = await deleteCartItem(id, productId);
            responseHandler(res, "Delete Item(s) Success", result)
        } catch (error) {
            next(error)
        }
    }
}