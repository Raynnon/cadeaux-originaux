const moveFile = require("../../middlewares/moveFile");
const slugify = require("slugify");

const addItem = async (req, model, imagesSubFolder) => {
  const imagesFolder =
    "images/" +
    imagesSubFolder +
    slugify(req.body.name, { trim: true, lower: true });

  const newItem = new model({ ...req.body, imagesFolder });
  await newItem.save();
  moveFile("./public/" + imagesFolder);
};

module.exports = addItem;
