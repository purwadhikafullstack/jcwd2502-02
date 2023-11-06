const db = require("./../models");
const { deleteFiles } = require('./../helper/deleteFiles');
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
            // const { id } = params;
            return await db.product.findAll({
                where: { isDeleted: 0 },
                include: [
                    {
                        model: db.product_category,
                        attributes: ["name"]
                    }
                ]
            })
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
    getAllProductsService2: async (sort) => {
        try {
            return await db.product.findAll({ where: { isDeleted: 0, }, order: [["name", sort]], });
        } catch (error) {
            return error;
        }
    },
    getAllProductsByCatService: async (catId, sort) => {
        try {
            return await db.product.findAll({ where: { product_categories_id: catId, }, order: [["name", sort]], });
        } catch (error) {
            return error;
        }
    },
    getAllProductsBySearchService: async (like, searchQuery, sort) => {
        try {
            return await db.product.findAll({ where: { name: { [like]: `%${searchQuery}%`, }, }, order: [["name", sort]], });
        } catch (error) {
            return error
        }
    },
    getAllProductsFilteredService: async (like, catId, searchQuery, sort) => {
        try {
            return await db.product.findAll({ where: { product_categories_id: catId, name: { [like]: `%${searchQuery}%`, }, }, order: [["name", sort]], });
        } catch (error) {
            return error
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
        try {
            const data = JSON.parse(body);
            const dataImage = file
            return await db.product.create({ ...data, image: dataImage });
        } catch (error) {
            return error
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
            const { inputName, inputPrice, inputDescription, inputCategory, id } = body;
            return await db.product.update({ name: inputName, price: inputPrice, description: inputDescription, product_categories_id: inputCategory }, { where: { id } });
        } catch (error) {
            return error
        }
    },
    getProductStockService: async (query) => {
        try {
            console.log(query);
            const { productId, branchId } = query
            return await db.product_stock.findOne({
                where: { products_id: productId, store_branch_id: branchId },
                include: [
                    {
                        model: db.product
                    }
                ]
            })
        } catch (error) {
            return error
        }
    }
}