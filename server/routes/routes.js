const express = require("express");
const helpers = require("./helpers");
const Category = require("../Models/Category");
const Product = require("../Models/Product");
const productsController = require("./controllers/productsController");
const categoriesController = require("./controllers/categoriesController");

const router = new express.Router();

helpers.crud(router, "products", Product, productsController);
helpers.crud(router, "categories", Category, categoriesController);

module.exports = router;
