const express = require("express");
const slugify = require("slugify");

const Nature = require("../../Models/categories/Nature");
const uploadFile = require("../../middlewares/uploadFile");
const moveFile = require("../../middlewares/moveFile");

const router = new express.Router();

/* ADD Nature */
const tempFolder = "./temp";

router.post("/nature", uploadFile(tempFolder), async (req, res) => {
  try {
    const imagesFolder =
      "./public/images/categories/nature/" +
      slugify(req.body.name, { trim: true, lower: true });

    moveFile(imagesFolder);

    const newNature = new Nature({ ...req.body, imagesFolder });

    await newNature.save();

    res.send("Nature added");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
