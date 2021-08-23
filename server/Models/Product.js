const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, default: "€" },
  description: String,
  strongPoints: Array,
  whoKind: Array,
  whoType: Array,
  occasions: Array,
  parties: Array,
  urlAmazon: String,
  imagesFolder: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date, default: Date.now },
  visits: { type: Number, default: 0 }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
