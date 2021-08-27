const mongoose = require("mongoose");

const natureSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  image: { data: Buffer, contentType: String }
});

const Nature = mongoose.model("Nature", natureSchema);

module.exports = Nature;
