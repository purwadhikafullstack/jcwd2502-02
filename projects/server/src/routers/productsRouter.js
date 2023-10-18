const express = require("express");
const Router = express.Router();

const { productsController } = require("../controllers");
// const upload = require("./../middleware/upload");

Router.get('/all', productsController.getAllProducts)
Router.get('/category', productsController.getCategory)
Router.get("/filtered", productsController.getAllProductsByCat);
Router.get("/productbycat", productsController.getProductByCategory);

module.exports = Router;