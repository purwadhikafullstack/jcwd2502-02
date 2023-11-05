const express = require("express");
const Router = express.Router();

const { productsController } = require("../controllers");
const upload = require("./../middlewares/upload");


Router.get('/all', productsController.getAllProducts)
Router.get('/allproducts', productsController.getAllProductsAndCategoryName)
Router.get("/filtered", productsController.getAllProductsByCat);
Router.get("/productbycat", productsController.getProductByCategory);
Router.post("/addproduct", upload, productsController.createProduct);
Router.patch("/deleteproduct/:id", productsController.deleteProduct);
Router.patch("/editimage/:idImage", upload, productsController.updateProductImage);
Router.get("/oneproduct/:id", productsController.getOneProduct);
Router.patch("/saveproduct", productsController.saveEditProduct);





module.exports = Router;