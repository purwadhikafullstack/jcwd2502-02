const express = require("express");
const Router = express.Router();

const { productsController } = require("../controllers");
const upload = require("./../middlewares/upload");


Router.get('/all', productsController.getAllProducts)
Router.get('/detail/:id', productsController.getOneProduct)
Router.get('/category', productsController.getCategory)
Router.get("/filtered", productsController.getAllProductsByCat);
Router.get("/productbycat", productsController.getProductByCategory);
Router.get("/onecategory/:id", productsController.getOneCategory);
Router.patch("/editcategory", productsController.editCategory);
Router.patch("/editimage/:idImage", upload, productsController.updateCategoryImage);
Router.patch("/deletecategory/:id", productsController.deleteCategory);
Router.patch("/savecategory", productsController.saveEditCat);
Router.post("/addcategory", upload, productsController.createCategory);

module.exports = Router;