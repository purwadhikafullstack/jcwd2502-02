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
const { reduceProductStockService } = require("./../services/productsService");
const { getDiscountService } = require("./../services/productsService");
const { updateProductDiscountService } = require("./../services/productsService");
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
    getAllProductRevised: async (req, res, next) => {
        try {
            const { catId, searchQuery, sort, branchId, page, discount } = req.query;
            const limit = 8;
            const like = Op.like;
            const whereClause = { isDeleted: 0 };
            if (catId) whereClause.product_categories_id = catId;
            if (searchQuery) whereClause.name = { [like]: `%${searchQuery}%` };
            if (discount === "diskon") {
                whereClause.discount_id = { [Op.or]: [1, 2] };
            }
            else if (discount === "bogo") {
                whereClause.discount_id = 3
            }
            const totalRecords = await db.product.count({ where: { ...whereClause } });
            const maxPages = Math.ceil(totalRecords / limit);
            const offset = (page - 1) * limit;
            const order = sort === "ASC" ? [['name', 'ASC']] : [['name', 'DESC']];
            const includeProductStock = branchId
                ? [
                    {
                        model: db.product_stock,
                        where: { store_branch_id: branchId },
                    },
                ]
                : [];
            const products = await db.product.findAll({
                where: { ...whereClause },
                include: includeProductStock,
                order,
                limit,
                offset,
            });
            const result = res.json({
                products,
                maxPages,
            });
        } catch (error) {
            next(error);
        }
    },
    getProductsForAdmin: async (req, res, next) => {
        try {
            const { catId, searchquery, sort, page, sortby } = req.query;
            const limit = 10;
            const like = Op.like;
            const whereClause = { isDeleted: 0 };
            if (catId) whereClause.product_categories_id = catId;
            if (searchquery) whereClause.name = { [like]: `%${searchquery}%` };
            const totalRecords = await db.product.count({ where: { ...whereClause } });
            const maxPages = Math.ceil(totalRecords / limit);
            const offset = (page - 1) * limit;
            const products = await db.product.findAll({
                where: { ...whereClause },
                order: [[`${sortby}`, sort]],
                limit,
                offset,
                include: [{ model: db.product_category, attributes: ["name"] }]
            });
            const result = res.json({
                products,
                maxPages,
            });
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
            const { catId, searchQuery, sort, branchId, page, sortby } = req.query;
            const limit = 8;
            const like = Sequelize.Op.like;
            const whereClause = { isDeleted: 0 };

            if (catId) whereClause.product_categories_id = catId;
            if (searchQuery) whereClause.name = { [like]: `%${searchQuery}%` };

            let products;
            let totalRecords;

            if (sortby === "stock") {
                products = await db.product.findAll({
                    where: { ...whereClause },
                    include: [
                        {
                            model: db.product_stock,
                            where: { store_branch_id: branchId },
                        },
                    ],
                    order: [[db.product_stock, 'stock', sort]],
                });

                // Count the total number of records after sorting
                totalRecords = products.length;

                // Apply pagination
                products = products.slice((page - 1) * limit, page * limit);
            } else {
                const includeProductStock = branchId
                    ? [
                        {
                            model: db.product_stock,
                            where: { store_branch_id: branchId },
                        },
                    ]
                    : [];

                // Fetch the total number of records without pagination
                totalRecords = await db.product.count({ where: { ...whereClause } });

                // Fetch the products with pagination
                products = await db.product.findAll({
                    where: { ...whereClause },
                    include: includeProductStock,
                    order: [[`${sortby}`, sort]],
                    limit,
                    offset: (page - 1) * limit,
                });
            }

            const maxPages = Math.ceil(totalRecords / limit);

            const result = res.json({
                products,
                maxPages,
            });
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
    reduceProductStock: async (req, res, next) => {
        try {
            const reducedProductStock = await reduceProductStockService(req.body)
            responseHandler(res, "Reduce Product Stock Success", reducedProductStock)
        } catch (error) {
            next(error)
        }
    },
    getDiscount: async (req, res, next) => {
        try {
            const discount = await getDiscountService()
            responseHandler(res, "Get Discount Type Success", discount)
        } catch (error) {
            next(error)
        }
    },
    updateProductDiscount: async (req, res, next) => {
        try {
            const productDiscount = await updateProductDiscountService(req.body)
            responseHandler(res, "Update Product Discount Success", productDiscount)
        } catch (error) {
            next(error)
        }
    },
    clonePriceToFinalPrice: async (req, res, next) => {
        try {
            const products = await db.product.findAll({ attributes: ["id", "price", "final_price"] });
            const updatedProducts = await Promise.all(
                products.map(async (product) => {
                    if (!product.final_price) {
                        await db.product.update({ final_price: product.price }, { where: { id: product.id } });
                        return product;
                    } else { return product; }
                })
            );
            responseHandler(res, "Clone Price to Final Price Success", updatedProducts);
        } catch (error) {
            next(error);
        }
    }
}