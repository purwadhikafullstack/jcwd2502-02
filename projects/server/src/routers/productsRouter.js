const express = require("express");
const Router = express.Router();

const { productsController } = require("../controllers");
const upload = require("./../middlewares/upload");


Router.get('/all', productsController.getAllProducts)
Router.get('/category', productsController.getCategory)
Router.get("/filtered", productsController.getAllProductsByCat);
Router.get("/productbycat", productsController.getProductByCategory);
Router.patch("/editcategory", productsController.editCategory);
Router.patch("/editimage/:idImage", upload, productsController.updateImage);

module.exports = Router;