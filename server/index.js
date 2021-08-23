const express = require("express");
const cors = require("cors");
const products = require("./routes/products");
require("./database/mongoDB");

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(products);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
