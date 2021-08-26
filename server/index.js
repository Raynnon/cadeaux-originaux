const express = require("express");
const cors = require("cors");
const products = require("./routes/products");
require("./database/mongoDB");
const dotenv = require("dotenv");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use(products);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
