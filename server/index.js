const express = require("express");
const products = require("./routes/products");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(products);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
