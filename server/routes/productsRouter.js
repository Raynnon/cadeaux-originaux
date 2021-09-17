const express = require("express");

const Product = require("../Models/Product");
const uploadFile = require("../middlewares/uploadFile");
const readAllItems = require("./creator/readAllItems");
const addItem = require("./creator/addItem");
const deleteItem = require("./creator/deleteItem");
const readOneItem = require("./creator/readOneItem");
const updateOneItem = require("./creator/updateOneItem");

const router = new express.Router();

/* READ PRODUCTS */
router.get("/products", async (req, res) => {
  try {
    res.send(await readAllItems(Product));
  } catch (e) {
    console.log(e);
    res.status(200).send();
  }
});

/* READ PRODUCTS BY ID */
router.get("/products/:id", async (req, res) => {
  try {
    const data = await readOneItem(req.params.id, Product);

    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

/* ADD PRODUCT */
router.post("/products", uploadFile(), async (req, res) => {
  try {
    await addItem(req, Product, "products/");

    res.send("Product added");
  } catch (e) {
    res.status(400).send(e);
  }
});

// EDIT PRODUCT BY ID
router.put("/products/:id", uploadFile(), async (req, res) => {
  try {
    await updateOneItem(req, Product);

    res.send("Product updated");
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

// DELETE PRODUCT
router.delete("/products/:id", async (req, res) => {
  try {
    await deleteItem(req.params.id, Product);

    res.send("Product deleted");
  } catch (e) {
    console.log(e);
    res.status(200).send();
  }
});

module.exports = router;
