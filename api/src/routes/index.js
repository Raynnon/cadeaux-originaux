const express = require("express");
const router = express.Router();

const productsRoutes = require("./products.routes");
const categoriesRoutes = require("./categories.routes");
const authRoutes = require("./auth.routes");

// Health check endpoint for monitoring and cron jobs
router.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Mount routes
router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/", authRoutes);

module.exports = router;
