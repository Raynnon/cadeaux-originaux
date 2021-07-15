const express = require("express");
const fs = require("fs");
const multer = require("multer");
const router = new express.Router();
const db = require("../database/postgre");

/* READ PRODUCTS */
router.get("/products", async (req, res) => {
  try {
    const products = await db.select().from("products");
    res.send(products);
  } catch (e) {
    console.log(e);
    res.status(200).send("Server unavailable");
  }
});

/* ADD PRODUCT */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "../images/products/temp"),

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/addProduct", upload.array("image"), async (req, res) => {
  try {
    console.log(req.files);
    res.send(req.files);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

module.exports = router;
