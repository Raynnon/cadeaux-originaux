const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: String, default: "€" },
  description: String,
  strongPoints: Array,
  whoKind: [String],
  whoType: [String],
  occasions: [String],
  parties: [String],
  urlAmazon: String,
  imagesFolder: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date, default: Date.now },
  visits: { type: Number, default: 0 }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
