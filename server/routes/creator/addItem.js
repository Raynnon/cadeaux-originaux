const moveFile = require("../../middlewares/moveFile");
const slugify = require("slugify");
const { readdir } = require("fs/promises");

const addItem = async (req, model, imagesSubFolder) => {
  const imagesFolder =
    "images/" +
    imagesSubFolder +
    slugify(req.body.name, { trim: true, lower: true });

  moveFile("./public/" + imagesFolder);

  const newItem = new model({ ...req.body, imagesFolder });

  await newItem.save();
};

module.exports = addItem;
