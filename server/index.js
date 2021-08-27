const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/productsRouter");
const natureRouter = require("./routes/categories/natureRouter");
require("./database/mongoDB");
const dotenv = require("dotenv");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use(productsRouter);
app.use(natureRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
