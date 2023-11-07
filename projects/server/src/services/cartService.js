const { query } = require("express");
const db = require("./../models");
module.exports = {
    cartUserId: async (dataToken) => {
        try {
            const { id } = dataToken;
            return await db.cart.findAll({
                where: {
                    user_id: id,
                },
                include: [
                    {
                        model: db.product,
                        required: true,
                    },
                ],
            });
        } catch (error) {
            return error
        }
    },
    addToCart: async (dataToken, query) => {
        try {
            const { id } = dataToken;
            const { productId, stroreId } = query

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

            const stock = await db.product_stock.findOne({
                where: { products_id: productId, store_branch_id: stroreId }
            })

            const productStock = stock.stock

            if (checkCart) {
                if (checkCart.quantity < productStock) {
                    await db.cart.update(
                        {
                            quantity: checkCart.quantity + 1,
                            subtotal: (checkCart.quantity + 1) * price
                        },
                        { where: { id: checkCart.id } }
                    );
                }
                else if (checkCart.quantity >= productStock) {
                    return { isError: true, message: "Oops, stock limit reached. No more items can be added" }
                }
            }

            else {
                if (productStock === 0) return { isError: true, message: "Oops, Item is Unavailable" }
                else {
                    await db.cart.create({ user_id: id, products_id: productId, quantity: 1, subtotal: price });
                }
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
    deleteCartItem: async (userId, product_Id) => {
        try {
            const deleteProduct = await db.cart.destroy({
                where: {
                    user_id: userId,
                    products_id: product_Id,
                },
            });
            const result = await db.cart.findAll({
                where: {
                    user_id: userId,
                },
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}