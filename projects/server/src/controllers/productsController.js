const db = require("./../models")
const { deleteFiles } = require('./../helper/deleteFiles');
const responseHandler = require("./../utils/responseHandler")
const { getAllProductsService } = require("./../services/productsService");
const { getAllProductsAndCategoryNameService } = require("./../services/productsService");
const { getAllProductsService2 } = require("./../services/productsService");
const { getAllProductsByCatService } = require("./../services/productsService");
const { getProductsByCategoryService } = require("./../services/productsService");
const { getAllProductsBySearchService } = require("./../services/productsService");
const { getAllProductsFilteredService } = require("./../services/productsService");
const { getOneProductService } = require("./../services/productsService");
const { createProductService } = require("./../services/productsService");
const { deleteProductService } = require("./../services/productsService");
const { updateProductImageService } = require("./../services/productsService");
const { saveEditProductService } = require("./../services/productsService");
const { getProductStockService } = require("./../services/productsService");
const { getAllProductStockService } = require("./../services/productsService");
const { getAllProductBranchStockService } = require("./../services/productsService");
const { updateProductStockService } = require("./../services/productsService");
const { getDiscountService } = require("./../services/productsService");
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
    getAllProductsAndCategoryName: async (req, res, next) => {
        try {
            const allProduct = await getAllProductsAndCategoryNameService(req.params);
            responseHandler(res, "Get All Product Success", allProduct)
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
            const { catId, searchQuery, sort, branchId } = req.query;
            const like = Op.like
            if (!catId && !searchQuery) {
                const allProduct = await getAllProductsService2(sort, branchId);
                responseHandler(res, "Get All Products Success 0", allProduct)
            } else if (!searchQuery) {
                const allProductByCat = await getAllProductsByCatService(catId, sort, branchId);
                responseHandler(res, "Get All Product By Category Success 1", allProductByCat)
            } else if (!catId) {
                const allProductBySearch = await getAllProductsBySearchService(like, searchQuery, sort, branchId)
                responseHandler(res, "Get All Product By Category Success 2", allProductBySearch)
            } else {
                const allProductFiltered = await getAllProductsFilteredService(like, catId, searchQuery, sort, branchId)
                responseHandler(res, "Get All Product By Category Success 3", allProductFiltered)
            }
        } catch (error) {
            next(error);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            console.log("ini isi req.body.data= " + req.body.data);
            console.log("ini isi req.files.image[0].filename= " + req.files.image[0].filename);
            const newProduct = await createProductService(req.body.data, req.files.image[0].filename)
            responseHandler(res, "Create Product Success", newProduct)
        } catch (error) {
            next(error)
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const newProduct = await deleteProductService(req.params)
            responseHandler(res, "Delete Product Success", newProduct)
        } catch (error) {
            next(error);
        }
    },
    updateProductImage: async (req, res, next) => {
        try {
            const newProductImage = await updateProductImageService(req.params, req.files.image[0].filename)
            responseHandler(res, 'Update Image Success!', newProductImage)
        } catch (error) {
            deleteFiles(req.files)
            next(error)
        }
    },
    getOneProduct: async (req, res, next) => {
        try {
            const product = await getOneProductService(req.params)
            if (!product) return responseHandler(res, "Product not found")
            responseHandler(res, "Get Product success", product)
        } catch (error) {
            next(error);
        }
    },
    saveEditProduct: async (req, res, next) => {
        try {
            const newProduct = await saveEditProductService(req.body)
            responseHandler(res, "Save Edited Product Success", newProduct)
        } catch (error) {
            next(error);
        }
    },
    getProductStock: async (req, res, next) => {
        try {
            const productStock = await getProductStockService(req.query)
            responseHandler(res, "Get Product Stock Success", productStock)
        } catch (error) {
            next(error)
        }
    },
    getAllProductStock: async (req, res, next) => {
        try {
            const allProductStock = await getAllProductStockService(req.params)
            responseHandler(res, "Get Product Stock Success", allProductStock)
        } catch (error) {
            next(error)
        }
    },
    getAllProductBranchStock: async (req, res, next) => {
        try {
            const allProductStock = await getAllProductBranchStockService(req.params)
            responseHandler(res, "Get Product Stock Success", allProductStock)
        } catch (error) {
            next(error)
        }
    },
    updateProductStock: async (req, res, next) => {
        try {
            const updatedProductStock = await updateProductStockService(req.body)
            console.log(updatedProductStock);
            responseHandler(res, "Update Product Stock Success", updatedProductStock)
        } catch (error) {
            next(error)
        }
    },
    getDiscount: async (req, res, next) => {
        try {
            const discount = await getDiscountService(req.params)
            console.log(discount);
            responseHandler(res, "Get Discount Type Success", discount)
        } catch (error) {
            next(error)
        }
    },
}