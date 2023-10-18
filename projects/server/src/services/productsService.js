const db = require("./../models");


module.exports = {
    getAllProductsService: async () => {
        try {
            return await db.product.findAll({
                where: {
                    isDeleted: 0,
                }
            });
        } catch (error) {
            return error;
        }
    },
    getCategoryService: async () => {
        try {
            return await db.product_category.findAll({
                where: {
                    isDeleted: 0,
                },
            });
        } catch (error) {
            return error;
        }
    },
    getAllProductsService2: async (sort) => {
        try {
            return await db.product.findAll({
                where: {
                    isDeleted: 0,
                },
                order: [["name", sort]],
            });
        } catch (error) {
            return error;
        }
    },
    getAllProductsByCatService: async (catId, sort) => {
        try {
            return await db.product.findAll({
                where: {
                    product_categories_id: catId,
                },
                order: [["name", sort]],
            });
        } catch (error) {
            return error;
        }
    },
    getProductsByCategoryService: async (catId) => {
        try {
            return await db.product.findAll({
                where: {
                    product_categories_id: catId,
                }
            });
        } catch (error) {
            return error;
        }
    }

}