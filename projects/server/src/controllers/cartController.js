const db = require("./../models")
const respondHandler = require('../utils/resnpondHandler');
const { cartUserId, addToCart } = require('../services/cartService')

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

            //this is service
            // const updatedCart = await addToCart(id, productId);

            const getProduct = await db.product.findOne({
                where: { id: productId }
            });

            const checkCart = await db.cart.findOne({
                where: {
                    user_id: id,
                    products_id: productId
                }
            });

            if (checkCart) {
                await db.cart.update(
                    { quantity: checkCart.quantity + 1 },
                    { where: { id: checkCart.id } }
                );
            } else {
                await db.cart.create({ user_id: id, products_id: productId, quantity: 1 });
            }

            const updateCart = await db.cart.findAll({
                where: {
                    user_id: id,
                }
            });

            respondHandler(res, {
                message: "Get Cart Success",
                data: updateCart
            })

        } catch (error) {
            next(error)
        }
    },



}