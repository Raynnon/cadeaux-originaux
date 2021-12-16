const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  imagesFolder: String,
  parent: Array
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
