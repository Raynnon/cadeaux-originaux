const express = require("express");

const Nature = require("../../Models/categories/Nature");
const uploadFile = require("../../middlewares/uploadFile");
const readAllItems = require("../crud/readAllItems");
const addItem = require("../crud/addItem");
const deleteItem = require("../crud/deleteItem");
const readOneItem = require("../crud/readOneItem");
const updateOneItem = require("../crud/updateOneItem");

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

/* READ NATURE BY ID */
router.get("/nature/:id", async (req, res) => {
  try {
    const data = await readOneItem(req.params.id, Nature);

    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(400).send();
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

// EDIT NATURE BY ID
router.put("/nature/:id", uploadFile(), async (req, res) => {
  try {
    await updateOneItem(req, Nature);

    res.send("Nature updated");
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

/* DELETE NATURE */
router.delete("/nature/:id", async (req, res) => {
  try {
    await deleteItem(req.params.id, Nature);

    res.send("Nature deleted");
  } catch (e) {
    console.log(e);
    res.status(200).send();
  }
});

module.exports = router;
