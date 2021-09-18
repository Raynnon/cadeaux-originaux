const express = require("express");
const helpers = require("./helpers");
const Nature = require("../Models/categories/Nature");
const products = require("./products");

const router = new express.Router();

products(router);
helpers.crud(router, "natures", Nature);

module.exports = router;
