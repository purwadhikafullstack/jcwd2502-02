const db = require("./../models")
const respondHandler = require('../utils/resnpondHandler');
const { cartUserId, addToCart, itemDelete } = require('../services/cartService')

module.exports = {
    getCart: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            // const cart = cartUserId(id)

            const cart = await db.cart.findAll({
                where: {
                    user_id: id,
                }
            });
            console.log(cart);
            respondHandler(res, {
                message: "Get Cart Success",
                data: cart
            })

        } catch (error) {
            next(error)
        }
    },

    addCart: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const { productId } = req.params
            // if (!id) {
            //     return respondHandler(res, {
            //         message: "Please log-in to add item to cart",
            //         data: null
            //     });
            // }

            const updatedCart = await addToCart(id, productId);

            respondHandler(res, {
                message: "Get Cart Success",
                data: updatedCart
            })

        } catch (error) {
            next(error)
        }
    },

    deleteItem: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const { productId } = req.params

            const updatedCart = await itemDelete(id, productId);


            respondHandler(res, {
                message: "Get Cart Success",
                data: updatedCart
            })

        } catch (error) {
            next(error)
        }
    }



}