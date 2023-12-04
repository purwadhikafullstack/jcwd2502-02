const db = require("./../models");
const { deleteFiles } = require('./../helper/deleteFiles');
const { sequelize } = require('./../models')
const { Op } = require('sequelize');
module.exports = {
    getAllProductsService: async () => {
        try {
            return await db.product.findAll({ where: { isDeleted: 0, } });
        } catch (error) {
            return error;
        }
    },
    getAllProductsAndCategoryNameService: async () => {
        try {
            return await db.product.findAll({ where: { isDeleted: 0 }, include: [{ model: db.product_category, attributes: ["name"] }], order: [['updatedAt', 'DESC']] })
        } catch (error) {
            return error;
        }
    },
    getProductsByCategoryService: async (query) => {
        try {
            const { catId } = query;
            return await db.product.findAll({ where: { product_categories_id: catId, } });
        } catch (error) {
            return error;
        }
    },
    getOneProductService: async (params) => {
        try {
            const { id } = params;
            return await db.product.findOne({ where: { id, isDeleted: 0, } });
        } catch (error) {
            return error
        }
    },
    createProductService: async (body, file) => {
        let t;
        try {
            t = await sequelize.transaction();
            const data = JSON.parse(body);
            const dataImage = file;
            const existingName = await db.product.findOne({
                where: {
                    name: { [Op.like]: data.name },
                    isDeleted: 0
                }
            })
            if (existingName) {
                return { status: 401, message: 'Product Name Already Exist', isError: true };
            } else {
                const newProduct = await db.product.create({ ...data, image: dataImage }, { transaction: t });
                const branches = await db.store_branch.findAll();
                for (const branch of branches) {
                    await db.product_stock.create({ products_id: newProduct.id, store_branch_id: branch.id, stock: 0 }, { transaction: t });
                }
                await t.commit();
                const newProductData = await db.product.findOne({
                    where: { id: newProduct.id }
                })
                return { status: 201, message: 'Product Created', isError: false };
            }
        } catch (error) {
            if (t) await t.rollback();
            return error;
        }
    },
    deleteProductService: async (params) => {
        try {
            const { id } = params;
            return await db.product.update({ isDeleted: 1 }, { where: { id } });
        } catch (error) {
            return error
        }
    },
    updateProductImageService: async (params, file) => {
        try {
            const { idImage } = params;
            const productId = await db.product.findOne({ where: { id: idImage } })
            const oldImage = productId.image
            const findImage = await db.product.update({ image: file }, { where: { id: idImage } })
            deleteFiles({ image: [oldImage] })
            return db.product.findOne({ where: { id: idImage } })
        } catch (error) {
            return error
        }
    },
    saveEditProductService: async (body) => {
        try {
            const { inputName, inputPrice, inputDescription, inputCategory, inputWeight, id } = body;
            const existingName = await db.product.findOne({
                where: {
                    name: inputName,
                    id: { [Op.not]: id },
                    isDeleted: 0
                }
            })
            if (existingName) {
                return { status: 401, message: 'Product Name Already Exist', isError: true };
            } else {
                const updatedProduct = await db.product.update({ name: inputName, price: inputPrice, description: inputDescription, product_categories_id: inputCategory, weight: inputWeight }, { where: { id } });
                return { status: 201, message: 'Product Updated', isError: false };
            }
        } catch (error) {
            return error
        }
    },
    getProductStockService: async (query) => {
        try {
            const { productId, branchId } = query
            return await db.product_stock.findOne({ where: { products_id: productId, store_branch_id: branchId }, include: [{ model: db.product }] })
        } catch (error) {
            return error
        }
    },
    getAllProductStockService: async (params) => {
        try {
            const { branchId } = params
            return await db.product_stock.findOne({ where: { store_branch_id: branchId } })
        } catch (error) {
            return error
        }
    },
    getAllProductBranchStockService: async (params) => {
        try {
            const { branchId } = params
            return await db.product_stock.findOne({ where: { store_branch_id: branchId } })
        } catch (error) {
            return error
        }
    },
    updateProductStockService: async (body) => {
        try {
            const { inputStock, productId, branchId } = body
            const currentProductStock = await db.product_stock.findOne({ where: { products_id: productId, store_branch_id: branchId } })
            if (!Number.isInteger(Number(inputStock))) { return ('Please enter a valid integer for stock') }
            else if (inputStock <= 0) { return ("Add stock cannot be 0 or minus") }
            else {
                const updatedProductStock = await db.product_stock.update({ stock: (currentProductStock.dataValues.stock + parseInt(inputStock)) }, { where: { products_id: productId, store_branch_id: branchId } })
                await db.stock_history.create({ stock: inputStock, products_id: productId, store_branch_id: branchId, description: 'Re-Stock Product', });
                return updatedProductStock
            }
        } catch (error) {
            return error
        }
    },
    reduceProductStockService: async (body) => {
        try {
            const { inputStock, productId, branchId } = body
            const currentProductStock = await db.product_stock.findOne({ where: { products_id: productId, store_branch_id: branchId } })
            if (!Number.isInteger(Number(inputStock))) { return ('Please enter a valid integer for stock') }
            else if (currentProductStock.dataValues.stock === 0) { return ("Product already out of stock") }
            else if (inputStock <= 0) { return ("Reduce stock cannot be 0 or minus") }
            else if (inputStock > currentProductStock.dataValues.stock) { return ("Reduce stock cannot exceed the current stock") }
            else {
                const updatedProductStock = await db.product_stock.update({ stock: (currentProductStock.dataValues.stock - parseInt(inputStock)) }, { where: { products_id: productId, store_branch_id: branchId } })
                await db.stock_history.create({ stock: inputStock, products_id: productId, store_branch_id: branchId, description: 'Product Expired', });
                return updatedProductStock
            }
        } catch (error) {
            return error
        }
    },
    getDiscountService: async () => {
        try {
            return await db.discount.findAll()
        } catch (error) {
            return error
        }
    },
    updateProductDiscountService: async (body) => {
        try {
            const { id, discount_value, discountId } = body
            const products = await db.product.findOne({ where: { id } })
            if (discountId === 1) {
                if (discount_value < 1 || discount_value > 99) { return ("Percentage discount must be between 1 and 99") }
                else {
                    const percentValue = products.price - (products.price * discount_value / 100)
                    return await db.product.update({ discount_value, final_price: percentValue, discount_id: discountId }, { where: { id } })
                }
            }
            else if (discountId === 2) {
                if (discount_value < 1 || discount_value >= products.dataValues.price) { return ("Nominal discount cannot exceed product price and cannot below 0") }
                else {
                    const nominalValue = products.price - discount_value
                    return await db.product.update({ discount_value, final_price: nominalValue, discount_id: discountId }, { where: { id } })
                }
            }
            else if (discountId === 3) { return await db.product.update({ discount_value: null, final_price: products.price, discount_id: discountId }, { where: { id } }) }
            else { return await db.product.update({ discount_value: null, final_price: products.price, discount_id: null }, { where: { id } }) }
        } catch (error) {
            return error
        }
    },
}