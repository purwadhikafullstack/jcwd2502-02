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
            console.log(getProduct.dataValues.weight);
            console.log(getProduct.dataValues.final_price);
            console.log(getProduct.dataValues.discount_id);
            const final_price = getProduct.dataValues.final_price
            const weightPerUnit = getProduct.dataValues.weight
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
                console.log("masuk checkcart");
                if (getProduct.dataValues.discount_id === 3) {
                    if (checkCart.quantity < productStock) {

                        const newQuantity = checkCart.quantity + 1;
                        const newSubtotal = (newQuantity - 1) * final_price;
                        const newWeight = newQuantity * weightPerUnit;

                        await db.cart.update(
                            {
                                quantity: newQuantity,
                                subtotal: newSubtotal,
                                total_weight: newWeight
                            },
                            { where: { id: checkCart.id } }
                        );
                    }
                    else if (checkCart.quantity >= productStock) {
                        return { isError: true, message: "Oops, stock limit reached. No more items can be added" }
                    }
                }
                else {
                    if (checkCart.quantity < productStock) {

                        const newQuantity = checkCart.quantity + 1;
                        const newSubtotal = newQuantity * final_price;
                        const newWeight = newQuantity * weightPerUnit;

                        await db.cart.update(
                            {
                                quantity: newQuantity,
                                subtotal: newSubtotal,
                                total_weight: newWeight
                            },
                            { where: { id: checkCart.id } }
                        );
                    }
                    else if (checkCart.quantity >= productStock) {
                        return { isError: true, message: "Oops, stock limit reached. No more items can be added" }
                    }
                }

            }

            else {
                if (getProduct.dataValues.discount_id === 3) {
                    console.log("ga masuk checkcart");
                    if (productStock === 0) return { isError: true, message: "Oops, Item is Unavailable" }
                    else {

                        await db.cart.create({ user_id: id, products_id: productId, quantity: 2, subtotal: final_price, total_weight: weightPerUnit * 2 });
                    }
                }
                else {
                    if (productStock === 0) return { isError: true, message: "Oops, Item is Unavailable" }
                    else {

                        await db.cart.create({ user_id: id, products_id: productId, quantity: 1, subtotal: final_price, total_weight: weightPerUnit });
                    }
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
            const final_price = getProduct.dataValues.final_price
            const weightPerUnit = getProduct.dataValues.weight
            const checkCart = await db.cart.findOne({
                where: {
                    user_id: id,
                    products_id: productId
                }
            });
            if (getProduct.dataValues.discount_id === 3) {
                if (checkCart.dataValues.quantity === 2) {
                    await db.cart.destroy({
                        where: {
                            user_id: id,
                            products_id: productId,
                        },
                    });
                } else if (checkCart) {
                    const newQuantity = checkCart.dataValues.quantity - 1;
                    const newSubtotal = (newQuantity - 1) * final_price;
                    const newWeight = newQuantity * weightPerUnit;
                    await db.cart.update(
                        { quantity: newQuantity, subtotal: newSubtotal, total_weight: newWeight },
                        { where: { id: checkCart.id } }
                    );
                }
            }
            else {
                if (checkCart.dataValues.quantity === 1) {
                    await db.cart.destroy({
                        where: {
                            user_id: id,
                            products_id: productId,
                        },
                    });
                } else if (checkCart) {
                    const newQuantity = checkCart.dataValues.quantity - 1;
                    const newSubtotal = newQuantity * final_price;
                    const newWeight = newQuantity * weightPerUnit;
                    await db.cart.update(
                        { quantity: newQuantity, subtotal: newSubtotal, total_weight: newWeight },
                        { where: { id: checkCart.id } }
                    );
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

    },
    addToCart2: async (dataToken, query) => {
        try {
            const { id } = dataToken;
            const { productId, stroreId } = query;

            const getProduct = await db.product.findOne({
                where: { id: productId }
            });

            const { price, weight } = getProduct.dataValues;

            const discount = await db.discount.findOne({
                where: { id: 3 } // Assuming id 3 is the buy one get one free discount id
            });

            const checkCart = await db.cart.findOne({
                where: {
                    user_id: id,
                    products_id: productId
                }
            });

            const stock = await db.product_stock.findOne({
                where: { products_id: productId, store_branch_id: stroreId }
            });

            const productStock = stock.stock;

            if (discount && discount.id === 3) {
                // If the product has the buy one get one free discount
                if (checkCart) {
                    if (checkCart.quantity < productStock) {
                        const newQuantity = checkCart.quantity + 2; // Add two products
                        const newSubtotal = newQuantity * price;
                        const newWeight = newQuantity * weight;

                        await db.cart.update(
                            {
                                quantity: newQuantity,
                                subtotal: newSubtotal,
                                total_weight: newWeight
                            },
                            { where: { id: checkCart.id } }
                        );
                    } else if (checkCart.quantity + 1 >= productStock) {
                        return { isError: true, message: "Oops, stock limit reached. No more items can be added" };
                    }
                } else {
                    if (productStock === 0) {
                        return { isError: true, message: "Oops, Item is Unavailable" };
                    } else {
                        // If the product is not in the cart, add two products
                        await db.cart.create({
                            user_id: id,
                            products_id: productId,
                            quantity: 2, // Add two products
                            subtotal: 2 * price,
                            total_weight: 2 * weight
                        });
                    }
                }
            } else {
                // Normal behavior if the product doesn't have the buy one get one free discount
                if (checkCart) {
                    if (checkCart.quantity < productStock) {
                        const newQuantity = checkCart.quantity + 1;
                        const newSubtotal = newQuantity * price;
                        const newWeight = newQuantity * weight;

                        await db.cart.update(
                            {
                                quantity: newQuantity,
                                subtotal: newSubtotal,
                                total_weight: newWeight
                            },
                            { where: { id: checkCart.id } }
                        );
                    } else if (checkCart.quantity >= productStock) {
                        return { isError: true, message: "Oops, stock limit reached. No more items can be added" };
                    }
                } else {
                    if (productStock === 0) {
                        return { isError: true, message: "Oops, Item is Unavailable" };
                    } else {
                        // If the product is not in the cart, add one product
                        await db.cart.create({
                            user_id: id,
                            products_id: productId,
                            quantity: 1,
                            subtotal: price,
                            total_weight: weight
                        });
                    }
                }
            }

            return await db.cart.findAll({
                where: {
                    user_id: id
                }
            });
        } catch (error) {
            return error;
        }
    },


}