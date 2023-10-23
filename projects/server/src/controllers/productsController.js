const db = require("./../models")
const { getAllProductsService } = require("./../services/productsService");
const { getAllProductsService2 } = require("./../services/productsService");
const { getCategoryService } = require("./../services/productsService");
const { getAllProductsByCatService } = require("./../services/productsService");
const { getProductsByCategoryService } = require("./../services/productsService");
const { getAllProductsBySearchService } = require("./../services/productsService");
const { getAllProductsFilteredService } = require("./../services/productsService");

const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            const allProduct = await getAllProductsService();
            res.status(201).send({
                isError: false,
                message: "Get All Products Success",
                data: allProduct,
            });
        } catch (error) {
            next(error);
        }
    },
    getCategory: async (req, res, next) => {
        try {
            const category = await getCategoryService();
            res.status(201).send({
                isError: false,
                message: "Get Category Success",
                data: category,
            });
        } catch (error) {
            next(error);
        }
    },
    getProductByCategory: async (req, res, next) => {
        try {
            const { catId } = req.query;
            const productByCat = await getProductsByCategoryService(catId);
            res.status(201).send({
                isError: false,
                message: "Get Product By Category Success",
                data: productByCat,
            });
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
                console.log(allProduct);
                res.status(201).send({
                    isError: false,
                    message: "Get All Products Success 0",
                    data: allProduct,
                });
            } else if (!searchQuery) {
                const allProductByCat = await getAllProductsByCatService(catId, sort);
                res.status(201).send({
                    isError: false,
                    message: "Get All Product By Category Success 1",
                    data: allProductByCat,
                });
            } else if (!catId) {
                const allProductBySearch = await getAllProductsBySearchService(like, searchQuery, sort)
                res.status(201).send({
                    isError: false,
                    message: "Get All Product By Category Success 2",
                    data: allProductBySearch,
                });
            } else {
                const allProductFiltered = await getAllProductsFilteredService(like, catId, searchQuery, sort)
                res.status(201).send({
                    isError: false,
                    message: "Get All Product By Category Success 3",
                    data: allProductFiltered,
                });
            }
        } catch (error) {
            next(error);
        }
    },
}