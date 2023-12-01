const db = require("./../models");
const { deleteFiles } = require('./../helper/deleteFiles');
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
module.exports = {
    getCategoryService: async () => {
        try {
            return await db.product_category.findAll({ where: { isDeleted: 0, }, order: [['updatedAt', 'DESC']] });
        } catch (error) {
            return error;
        }
    },
    getAllCategoryService: async (query) => {
        try {
            const { search, sort, page } = query;
            const limit = 6;
            const like = Op.like;
            const whereClause = {
                isDeleted: 0,
            };
            if (search) {
                whereClause.name = { [like]: `%${search}%` };
            }
            const totalRecords = await db.product_category.count({ where: { ...whereClause } });
            const maxPages = Math.ceil(totalRecords / limit);
            const offset = (page - 1) * limit;
            let order;
            switch (sort) {
                case 'ASC':
                    order = [['updatedAt', 'ASC']];
                    break;
                case 'DESC':
                    order = [['updatedAt', 'DESC']];
                    break;
                case 'AZ':
                    order = [['name', 'ASC']];
                    break;
                case 'ZA':
                    order = [['name', 'DESC']];
                    break;
                default:
                    order = [['updatedAt', 'DESC']];
            }
            const categories = await db.product_category.findAll({
                where: { ...whereClause },
                order,
                limit,
                offset,
            });
            return {
                categories,
                maxPages,
            };
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
    },
}