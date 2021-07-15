const express = require("express");
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
  destination: "../images/products",
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage: storage });

router.post(
  "/addProduct",
  upload.single("image1"),
  upload.single("image2"),
  upload.single("image3"),
  async (req, res) => {
    try {
      console.log(req.file);
      res.send(req.file);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  }
);

module.exports = router;
