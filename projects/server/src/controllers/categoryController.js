const db = require("./../models")
const { deleteFiles } = require('./../helper/deleteFiles');
const responseHandler = require("./../utils/responseHandler")
const { Sequelize } = require("sequelize");
const { deleteCategoryService } = require("./../services/categoryService");
const { getCategoryService } = require("./../services/categoryService");
const { getAllCategoryService } = require("./../services/categoryService");
const { editCategoryService1 } = require("./../services/categoryService");
const { editCategoryService2 } = require("./../services/categoryService");
const { createCategoryService } = require("./../services/categoryService");
const { getOneCategoryService } = require("./../services/categoryService");
const { saveEditCategoryService } = require("./../services/categoryService");
const { updateCategoryImageService } = require("./../services/categoryService");
const Op = Sequelize.Op;
module.exports = {
    getCategory: async (req, res, next) => {
        try {
            const category = await getCategoryService();
            responseHandler(res, "Get Category Success", category)
        } catch (error) {
            next(error);
        }
    },
    getAllCategory: async (req, res, next) => {
        try {
            const allCategory = await getAllCategoryService(req.query);
            responseHandler(res, "Get All Category Success", allCategory)
        } catch (error) {
            next(error);
        }
    },
    editCategory: async (req, res, next) => {
        try {
            const category = await editCategoryService1(req.body);
            const categoryUpdate = await editCategoryService2(req.body);
            responseHandler(res, "Edit Category Success", categoryUpdate)
        } catch (error) {
            next(error);
        }
    },
    createCategory: async (req, res, next) => {
        try {
            const addCategory = await createCategoryService(req.body.data, req.files.image[0].filename)
            responseHandler(res, "Product Added", addCategory)
        } catch (error) {
            next(error);
        }
    },
    getOneCategory: async (req, res, next) => {
        try {
            const category = await getOneCategoryService(req.params)
            if (!category) return responseHandler(res, "Category not found")
            responseHandler(res, "Get Category success", category.dataValues.name)
        } catch (error) {
            next(error);
        }
    },
    saveEditCat: async (req, res, next) => {
        try {
            const newCategory = await saveEditCategoryService(req.body)
            responseHandler(res, "Save Edited Category Success", newCategory)
        } catch (error) {
            next(error);
        }
    },
    updateCategoryImage: async (req, res, next) => {
        try {
            const newCategoryImage = await updateCategoryImageService(req.params, req.files.image[0].filename)
            responseHandler(res, 'Update Image Success!', newCategoryImage)
        } catch (error) {
            deleteFiles(req.files)
            next(error)
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            const newCategory = await deleteCategoryService(req.params)
            responseHandler(res, "Delete Category Success", newCategory)
        } catch (error) {
            next(error);
        }
    },
}
