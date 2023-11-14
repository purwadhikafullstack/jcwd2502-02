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
    getAllProductsAndCategoryNameService: async () => {
        try {
            return await db.product.findAll({
                where: { isDeleted: 0 },
                include: [
                    {
                        model: db.product_category,
                        attributes: ["name"]
                    }
                ],
                order: [['updatedAt', 'DESC']]
            })
        } catch (error) {
            return error;
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
    getAllProductsService2: async (sort, branchId) => {
        try {
            return await db.product.findAll({ where: { isDeleted: 0, }, include: [{ model: db.product_stock, where: { store_branch_id: branchId } }], order: [["name", sort]], });
        } catch (error) {
            return error;
        }
    },
    getAllProductsByCatService: async (catId, sort, branchId) => {
        try {
            return await db.product.findAll({ where: { product_categories_id: catId, }, include: [{ model: db.product_stock, where: { store_branch_id: branchId } }], order: [["name", sort]], });
        } catch (error) {
            return error;
        }
    },
    getAllProductsBySearchService: async (like, searchQuery, sort, branchId) => {
        try {
            return await db.product.findAll({ where: { name: { [like]: `%${searchQuery}%`, }, }, include: [{ model: db.product_stock, where: { store_branch_id: branchId } }], order: [["name", sort]], });
        } catch (error) {
            return error
        }
    },
    getAllProductsFilteredService: async (like, catId, searchQuery, sort, branchId) => {
        try {
            return await db.product.findAll({ where: { product_categories_id: catId, name: { [like]: `%${searchQuery}%`, }, }, include: [{ model: db.product_stock, where: { store_branch_id: branchId } }], order: [["name", sort]], });
        } catch (error) {
            return error
        }
    },
    getOneProductService: async (params) => {
        try {
            const { id } = params;
            return await db.product.findOne({ where: { id, isDeleted: 0, } });
        } catch (error) {
            return error
        }
    },
    createProductService: async (body, file) => {
        try {
            const data = JSON.parse(body);
            const dataImage = file
            const newProduct = await db.product.create({ ...data, image: dataImage });
            const branches = await db.store_branch.findAll()
            for (const branch of branches) await db.product_stock.create({ products_id: newProduct.id, store_branch_id: branch.id, stock: 0 });
            return newProduct
        } catch (error) {
            return error
        }
    },
    deleteProductService: async (params) => {
        try {
            const { id } = params;
            return await db.product.update({ isDeleted: 1 }, { where: { id } });
        } catch (error) {
            return error
        }
    },
    updateProductImageService: async (params, file) => {
        try {
            const { idImage } = params;
            const productId = await db.product.findOne({ where: { id: idImage } })
            const oldImage = productId.image
            const findImage = await db.product.update({ image: file }, { where: { id: idImage } })
            deleteFiles({ image: [oldImage] })
            return db.product.findOne({ where: { id: idImage } })
        } catch (error) {
            return error
        }
    },
    saveEditProductService: async (body) => {
        try {
            const { inputName, inputPrice, inputDescription, inputCategory, id } = body;
            return await db.product.update({ name: inputName, price: inputPrice, description: inputDescription, product_categories_id: inputCategory }, { where: { id } });
        } catch (error) {
            return error
        }
    },
    getProductStockService: async (query) => {
        try {
            const { productId, branchId } = query
            return await db.product_stock.findOne({
                where: { products_id: productId, store_branch_id: branchId },
                include: [
                    {
                        model: db.product
                    }
                ]
            })
        } catch (error) {
            return error
        }
    },
    getAllProductStockService: async (params) => {
        try {
            const { branchId } = params
            return await db.product_stock.findOne({
                where: { store_branch_id: branchId }
            })
        } catch (error) {
            return error
        }
    },
    getAllProductBranchStockService: async (params) => {
        try {
            const { branchId } = params
            return await db.product_stock.findOne({
                where: { store_branch_id: branchId }
            })
        } catch (error) {
            return error
        }
    },
    updateProductStockService: async (body) => {
        try {
            const { inputStock, productId, branchId } = body
            const updatedProductStock = await db.product_stock.update({ stock: inputStock }, { where: { products_id: productId, store_branch_id: branchId } })
            await db.stock_history.create({ stock: inputStock, products_id: productId, store_branch_id: branchId, description: 'Re-Stock Product', });
            return updatedProductStock
        } catch (error) {
            return error
        }
    },
    getDiscountService: async () => {
        try {
            return await db.discount.findAll()
        } catch (error) {
            return error
        }
    },
    updateProductDiscountService: async (body) => {
        try {
            const { id, nominal, percent, discountId } = body
            if (discountId === 1) { return await db.product.update({ discount_percent: percent, discount_nominal: null, discount_id: discountId }, { where: { id } }) }
            else if (discountId === 2) { return await db.product.update({ discount_percent: null, discount_nominal: nominal, discount_id: discountId }, { where: { id } }) }
            else if (discountId === 3) { return await db.product.update({ discount_percent: null, discount_nominal: null, discount_id: discountId }, { where: { id } }) }
            else { return await db.product.update({ discount_percent: null, discount_nominal: null, discount_id: null }, { where: { id } }) }
        } catch (error) {
            return error
        }
    },
}