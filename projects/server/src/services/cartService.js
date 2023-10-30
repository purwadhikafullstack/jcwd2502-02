const db = require("./../models");
module.exports = {
    cartUserId: async (dataToken) => {
        try {
            const { id } = dataToken;
            return await db.cart.findAll({
                where: {
                    user_id: id,
                }
            });
        } catch (error) {
            return error
        }
    },
    addToCart: async (dataToken, params) => {
        try {
            const { id } = dataToken;
            const { productId } = params
            // if (!id) {
            //     return respondHandler(res, {
            //         message: "Please log-in to add item to cart",
            //         data: null
            //     });
            // }
            const getProduct = await db.product.findOne({
                where: { id: productId }
            });
            console.log(getProduct.dataValues.price);
            const price = getProduct.dataValues.price
            const checkCart = await db.cart.findOne({
                where: {
                    user_id: id,
                    products_id: productId
                }
            });
            if (checkCart) {
                await db.cart.update(
                    {
                        quantity: checkCart.quantity + 1,
                        subtotal: (checkCart.quantity + 1) * price
                    },
                    { where: { id: checkCart.id } }
                );
            } else {
                await db.cart.create({ user_id: id, products_id: productId, quantity: 1, subtotal: price });
            }
            return await db.cart.findAll({
                where: {
                    user_id: id,
                }
            });
        } catch (error) {
            return error
        }
    },
    itemDelete: async (dataToken, params) => {
        try {
            const { id } = dataToken;
            const { productId } = params
            const getProduct = await db.product.findOne({
                where: { id: productId }
            });
            const price = getProduct.dataValues.price
            const checkCart = await db.cart.findOne({
                where: {
                    user_id: id,
                    products_id: productId
                }
            });
            if (checkCart.dataValues.quantity === 1) {
                await db.cart.destroy({
                    where: {
                        user_id: id,
                        products_id: productId,
                    },
                });
            } else if (checkCart) {
                const newQuantity = checkCart.dataValues.quantity - 1;
                const newSubtotal = newQuantity * price;
                await db.cart.update(
                    { quantity: newQuantity, subtotal: newSubtotal },
                    { where: { id: checkCart.id } }
                );
            }
            return await db.cart.findAll({
                where: {
                    user_id: id,
                }
            });
        } catch (error) {
            return error
        }
    },
}