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
    getCategoryService: async () => {
        try {
            return await db.product_category.findAll({ where: { isDeleted: 0, }, });
        } catch (error) {
            return error;
        }
    },
    editCategoryService1: async (body) => {
        try {
            const { id } = body;
            return await db.product_category.findOne({ where: { id } })
        } catch (error) {
            return error
        }
    },
    editCategoryService2: async (body) => {
        try {
            const { id, name } = body;
            return await db.product_category.update({ name }, { where: { id } })
        } catch (error) {
            return error
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
    createCategoryService: async (body, file) => {
        try {
            const data = JSON.parse(body);
            const dataImage = file
            return await db.product_category.create({ ...data, image: dataImage });
        } catch (error) {
            return error
        }
    },
    getOneCategoryService: async (params) => {
        try {
            const { id } = params;
            return await db.product_category.findOne({ where: { id } });
        } catch (error) {
            return error
        }
    },
    saveEditCategoryService: async (body) => {
        try {
            const { inputCat, id } = body;
            return await db.product_category.update({ name: inputCat }, { where: { id } });
        } catch (error) {
            return error
        }
    },
    updateCategoryImageService: async (params, file) => {
        try {
            const { idImage } = params;
            const catId = await db.product_category.findOne({ where: { id: idImage } })
            const oldImage = catId.image
            const findImage = await db.product_category.update({ image: file }, { where: { id: idImage } })
            deleteFiles({ image: [oldImage] })
            return db.product_category.findOne({ where: { id: idImage } })
        } catch (error) {
            return error
        }
    },
    deleteCategoryService: async (params) => {
        try {
            const { id } = params;
            return await db.product_category.update({ isDeleted: 1 }, { where: { id } });
        } catch (error) {
            return error
        }
    }
}