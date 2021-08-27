const express = require("express");

const Nature = require("../../Models/categories/Nature");
const uploadFile = require("../../middlewares/uploadFile");

const router = new express.Router();

/* ADD PRODUCT */
const tempFolder = "./temp";

router.post("/nature", uploadFile(tempFolder), async (req, res) => {
  try {
    /*  const newNature = new Nature({ ...req.body });

    await newNature.save(); */

    res.send("Nature added");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
