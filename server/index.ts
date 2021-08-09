import express from "express";
import cors from "cors";
const products = require("./routes/products");

const app = express();
const port: number = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(products);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
