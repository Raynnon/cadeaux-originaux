const express = require("express");
const router = new express.Router();
const db = require("../database/postgre");

const app = express();

router.get("/products", async (req, res) => {
  try {
    const products = await db.select().from("products");
    res.send(products);
  } catch (e) {
    console.log(e);
    res.status(200).send("Server unavailable");
  }
});

router.post("/addProduct", async (req, res) => {});

module.exports = router;
