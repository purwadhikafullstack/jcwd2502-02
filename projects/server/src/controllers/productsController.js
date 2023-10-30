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
    createCategory: async (req, res, next) => {
        try {
            const data = JSON.parse(req.body.data);
            const dataImage = req.files.image[0].filename
            const addCategory = await db.product_category.create({ ...data, image: dataImage });
            res.status(201).send({
                isError: false,
                message: "Product Added",
                data: addCategory,
            });
        } catch (error) {
            next(error);
        }
    },
    getOneCategory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await db.product_category.findOne({ where: { id } });
            if (!category) {
                return res.status(200).send({
                    isError: true,
                    message: "Category not found",
                });
            }
            res.status(200).send({
                isError: false,
                message: "get data success",
                data: category.dataValues.name,
            });
        } catch (error) {
            next(error);
        }
    },
    saveEditCat: async (req, res, next) => {
        try {
            const { inputCat, id } = req.body;
            const newCategory = await db.product_category.update({ name: inputCat }, { where: { id } });
            res.status(200).send({
                isError: false,
                message: "Changes Success!",
                data: newCategory
            });
        } catch (error) {
            next(error);
        }
    },
    updateCategoryImage: async (req, res, next) => {
        try {
            // 1. Ambil id user
            const { idImage } = req.params;
            console.log(idImage);
            // 2. Ambil path image lama
            const catId = await db.product_category.findOne({ where: { id: idImage } })
            // // 3. Update new path on table
            console.log(catId.image);
            console.log(req.files.image[0]);
            const oldImage = catId.image
            const findImage = await db.product_category.update({
                image: req.files.image[0].filename
            }, {
                where: {
                    id: idImage
                }
            })
            // // // 4. Delete image lama
            deleteFiles({
                image: [oldImage
                ]
            })
            // // 5. Kirim response
            const newCategoryImage = await db.product_category.findOne({ where: { id: idImage } })

            res.status(201).send({
                isError: false,
                message: 'Update Image Success!',
                data: newCategoryImage
            })
        } catch (error) {
            console.log(error);
            deleteFiles(req.files)
            next(error)
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const newCategory = await db.product_category.update({ isDeleted: 1 }, { where: { id } });
            res.status(200).send({
                isError: false,
                message: "Changes Success!",
                data: newCategory
            });
        } catch (error) {
            next(error);
        }
    },
}