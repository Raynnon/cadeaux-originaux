const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const uploadFile = require("../middlewares/upload.middleware");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categories.controller");

// GET /categories - Get all categories
router.get("/", getCategories);

// POST /categories - Create a new category
router.post("/", auth, uploadFile(), createCategory);

// PUT /categories/:id - Update a category by ID
router.put("/:id", auth, uploadFile(), updateCategory);

// DELETE /categories/:id - Delete a category by ID
router.delete("/:id", auth, deleteCategory);

module.exports = router;
