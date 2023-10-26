const db = require("./../models")
const { deleteFiles } = require('./../helper/deleteFiles');
const { getAllProductsService } = require("./../services/productsService");
const { getAllProductsService2 } = require("./../services/productsService");
const { getCategoryService } = require("./../services/productsService");
const { getAllProductsByCatService } = require("./../services/productsService");
const { getProductsByCategoryService } = require("./../services/productsService");
const { getAllProductsBySearchService } = require("./../services/productsService");
const { getAllProductsFilteredService } = require("./../services/productsService");
const { editCategoryService1 } = require("./../services/productsService");
const { editCategoryService2 } = require("./../services/productsService");
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
    editCategory: async (req, res, next) => {
        try {
            const { id, name } = req.body;
            console.log(req.files);
            const category = await editCategoryService1(id);
            const categoryUpdate = await editCategoryService2(id, name);
            res.status(201).send({
                isError: false,
                message: "Edit Category Success",
                data: categoryUpdate,
            });
        } catch (error) {
            next(error);
        }
    },
    updateImage: async (req, res, next) => {
        try {
            // 1. Ambil id image
            const { idImage } = req.params
            // console.log(">>>>UI0");
            // console.log(req.files.image[0]);
            // console.log(">>>>UI1");
            // 2. Ambil path image lama
            const findImage = await db.product_category.findOne({
                where: {
                    id: idImage
                }
            })
            // console.log(findImage);
            // console.log(">>>>UI2");
            // 3. Update new path on table
            console.log(req.files);
            const newImage = await db.product_category.update({
                image: req.files.image[0].filename
            }, {
                where: {
                    id: idImage
                }
            })
            // console.log('<<<');
            // console.log(newImage);
            // 4. Delete image lama
            deleteFiles({
                image: [findImage.dataValues.image
                ]
            })

            // 5. Kirim response
            res.status(201).send({
                isError: false,
                message: 'Update Image Success!',
                data: newImage
            })
        } catch (error) {
            console.log(error);
            deleteFiles(req.files)
            next(error)
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