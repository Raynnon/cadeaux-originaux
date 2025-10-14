const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const uploadFile = require("../middlewares/upload.middleware");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/products.controller");

// GET /products - Get all products with filters
router.get("/", getProducts);

// POST /products - Create a new product
router.post("/", auth, uploadFile(), createProduct);

// PUT /products/:id - Update a product by ID
router.put("/:id", auth, uploadFile(), updateProduct);

// DELETE /products/:id - Delete a product by ID
router.delete("/:id", auth, deleteProduct);

module.exports = router;
