const express = require("express");
const helpers = require("./helpers");
const Category = require("../Models/Category");
const Product = require("../Models/Product");

const router = new express.Router();

helpers.crud(router, "products", Product);
helpers.crud(router, "categories", Category);

module.exports = router;
