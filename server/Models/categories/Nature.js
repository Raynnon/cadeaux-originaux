const mongoose = require("mongoose");

const natureSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  imagesFolder: String
});

const Nature = mongoose.model("Nature", natureSchema);

module.exports = Nature;
