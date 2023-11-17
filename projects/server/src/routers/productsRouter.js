const express = require("express");
const Router = express.Router();

const { productsController } = require("../controllers");
const upload = require("./../middlewares/upload");


Router.get('/all', productsController.getAllProducts)
Router.get('/allproducts', productsController.getAllProductsAndCategoryName)
Router.get("/filtered", productsController.getAllProductsByCat);
Router.get("/productbycat", productsController.getProductByCategory);
Router.get("/oneproduct/:id", productsController.getOneProduct);
Router.get("/product-stock", productsController.getProductStock);
Router.get("/all-product-stock/:branchId", productsController.getAllProductStock);
Router.get("/discount", productsController.getDiscount);
Router.get("/price", productsController.clonePriceToFinalPrice);
Router.get("/allproductsfix", productsController.getAllProductRevised);


Router.post("/addproduct", upload, productsController.createProduct);

Router.patch("/deleteproduct/:id", productsController.deleteProduct);
Router.patch("/editimage/:idImage", upload, productsController.updateProductImage);
Router.patch("/saveproduct", productsController.saveEditProduct);
Router.patch("/updatestock", productsController.updateProductStock);
Router.patch("/reducestock", productsController.reduceProductStock);
Router.patch("/updatediscount", productsController.updateProductDiscount);





module.exports = Router;