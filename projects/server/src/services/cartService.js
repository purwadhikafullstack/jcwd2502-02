const db = require("./../models");
module.exports = {

    cartUserId: async (id) => {
        try {
            return await db.cart.findAll({
                where: {
                    user_id: id,
                }
            });
        } catch (error) {
            return error
        }
    },


    addToCart: async (userId, productId) => {
        try {
            const getProduct = await db.product.findOne({
                where: { id: productId }
            });

            const checkCart = await db.cart.findOne({
                where: {
                    user_id: userId,
                    products_id: productId
                }
            });

            if (checkCart) {
                await db.cart.update(
                    { quantity: checkCart.quantity + 1 },
                    { where: { id: checkCart.id } }
                );
            } else {
                await db.cart.create({ user_id: userId, products_id: productId, quantity: 1 });
            }

            return await db.cart.findAll({
                where: {
                    user_id: userId,
                }
            });
        } catch (error) {
            return error
        }
    },

    itemDelete: async (userId, productId) => {
        try {
            const getProduct = await db.product.findOne({
                where: { id: productId }
            });

            const checkCart = await db.cart.findOne({
                where: {
                    user_id: userId,
                    products_id: productId
                }
            });

            console.log(checkCart.dataValues.quantity);

            if (checkCart.dataValues.quantity === 1) {
                await db.cart.destroy({
                    where: {
                        user_id: userId,
                        products_id: productId,
                    },
                });
            } else if (checkCart) {
                await db.cart.update(
                    { quantity: checkCart.dataValues.quantity - 1, },
                    { where: { id: checkCart.id } }
                );
            }

            return await db.cart.findAll({
                where: {
                    user_id: userId,
                }
            });

        } catch (error) {
            return error
        }
    },

}