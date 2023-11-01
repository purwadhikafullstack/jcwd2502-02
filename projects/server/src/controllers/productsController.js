const db = require("./../models")
const { deleteFiles } = require('./../helper/deleteFiles');
const responseHandler = require("./../utils/responseHandler")
const { getAllProductsService, deleteCategoryService } = require("./../services/productsService");
const { getAllProductsService2 } = require("./../services/productsService");
const { getCategoryService } = require("./../services/productsService");
const { getAllProductsByCatService } = require("./../services/productsService");
const { getProductsByCategoryService } = require("./../services/productsService");
const { getAllProductsBySearchService } = require("./../services/productsService");
const { getAllProductsFilteredService } = require("./../services/productsService");
const { editCategoryService1 } = require("./../services/productsService");
const { editCategoryService2 } = require("./../services/productsService");
const { createCategoryService } = require("./../services/productsService");
const { getOneCategoryService } = require("./../services/productsService");
const { saveEditCategoryService } = require("./../services/productsService");
const { updateCategoryImageService } = require("./../services/productsService");
const { Sequelize } = require("sequelize");

const Op = Sequelize.Op;

module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            const allProduct = await getAllProductsService();
            responseHandler(res, "Get All Product Success", allProduct)
        } catch (error) {
            next(error);
        }
    },
    getCategory: async (req, res, next) => {
        try {
            const category = await getCategoryService();
            responseHandler(res, "Get All Category Success", category)
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
    getProductByCategory: async (req, res, next) => {
        try {
            const productByCat = await getProductsByCategoryService(req.query);
            responseHandler(res, "Get Product By Category Success", productByCat)
        } catch (error) {
            next(error);
        }
    },
    getAllProductsByCat: async (req, res, next) => {
        try {
            const { catId, searchQuery, sort } = req.query;
            const like = Op.like
            if (!catId && !searchQuery) {
                const allProduct = await getAllProductsService2(sort);
                responseHandler(res, "Get All Products Success 0", allProduct)
            } else if (!searchQuery) {
                const allProductByCat = await getAllProductsByCatService(catId, sort);
                responseHandler(res, "Get All Product By Category Success 1", allProductByCat)
            } else if (!catId) {
                const allProductBySearch = await getAllProductsBySearchService(like, searchQuery, sort)
                responseHandler(res, "Get All Product By Category Success 2", allProductBySearch)
            } else {
                const allProductFiltered = await getAllProductsFilteredService(like, catId, searchQuery, sort)
                responseHandler(res, "Get All Product By Category Success 3", allProductFiltered)
            }
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