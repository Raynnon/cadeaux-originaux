const express = require("express");
const router = express.Router();

const productsRoutes = require("./products.routes");
const categoriesRoutes = require("./categories.routes");
const authRoutes = require("./auth.routes");

// Mount routes
router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/", authRoutes);

module.exports = router;
