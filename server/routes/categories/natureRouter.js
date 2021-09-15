const express = require("express");

const Nature = require("../../Models/categories/Nature");
const uploadFile = require("../../middlewares/uploadFile");
const readAllItems = require("../creator/readAllItems");
const addItem = require("../creator/addItem");

const router = new express.Router();

/* READ NATURE */
router.get("/natures", async (req, res) => {
  try {
    res.send(await readAllItems(Nature));
  } catch {
    console.log(e);
    res.status(200).send();
  }
});

/* ADD NATURE */
router.post("/nature", uploadFile(), async (req, res) => {
  try {
    await addItem(req, Nature, "categories/nature/");

    res.send("Nature added");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
