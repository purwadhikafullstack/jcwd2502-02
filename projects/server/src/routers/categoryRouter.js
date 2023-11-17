const express = require("express");
const Router = express.Router();

const { categoryController } = require("../controllers");
const upload = require("./../middlewares/upload");

Router.get('/all', categoryController.getCategory)
Router.get("/onecategory/:id", categoryController.getOneCategory);
Router.patch("/editcategory", categoryController.editCategory);
Router.patch("/editimage/:idImage", upload, categoryController.updateCategoryImage);
Router.patch("/deletecategory/:id", categoryController.deleteCategory);
Router.patch("/savecategory", categoryController.saveEditCat);
Router.post("/addcategory", upload, categoryController.createCategory);

module.exports = Router;