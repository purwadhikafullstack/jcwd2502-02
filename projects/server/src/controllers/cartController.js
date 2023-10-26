const db = require("./../models")
const respondHandler = require('../utils/resnpondHandler');
const { cartUserId } = require('../services/cartService')

module.exports = {
    getCart: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const cart = cartUserId(id)
            console.log(id);
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
            const getProduct = await db.product.findOne({
                where: { id: productId }
            })
            const price = getProduct.dataValues.price

            const checkCart = await db.cart.findOne({
                where: {
                    user_id: id,
                    products_id: productId
                }
            })

            // const prevQ = "hi"

            // if (checkCart) {
            //     await db.cart.update(
            //         { quantity: (checkCart.dataValues.quantity) + 1 },
            //         { where: { id: checkCart.id } }
            //     );
            // } else if (checkCart == null) {
            //     await db.cart.create({ user_id: id, products_id: productId, quantity: 1 });
            // }
            // const update = await db.cart.create({ user_id: id, products_id: productId, quantity: 1 });


            console.log(checkCart);
            console.log(id);

            respondHandler(res, {
                message: "Get Cart Success",
                data: checkCart
            })

        } catch (error) {
            next(error)
        }
    }


}