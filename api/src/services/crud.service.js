const fs = require("fs");
const slugify = require("slugify");
const moveFile = require("../middlewares/moveFile.middleware");

/**
 * Create a new item in the database
 */
const createItem = async (req, model, imagesSubFolder) => {
  const imagesFolder =
    "images/" +
    imagesSubFolder +
    slugify(req.body.name, { trim: true, lower: true });

  const newItem = new model({ ...req.body, imagesFolder });
  await newItem.save();
  moveFile("./public/" + imagesFolder);
};

/**
 * Read one item by ID
 */
const readOneItem = async (id, model) => {
  const data = await model.findById(id).lean().exec();
  return data;
};

/**
 * Update one item by ID
 */
const updateOneItem = async (req, model) => {
  const _id = req.params.id;
  const { basename } = require("path");
  const data = await model.findById(_id).lean().exec();

  // Delete images
  const { imagesToDelete } = req.body;
  if (imagesToDelete) {
    const fileName =
      typeof imagesToDelete !== "string"
        ? imagesToDelete.map((file) => {
            return basename(file);
          })
        : [basename(imagesToDelete)];

    fileName.forEach((file) => {
      fs.unlinkSync(`./public/${data.imagesFolder}/${file}`);
    });
  }

  moveFile("./public/" + data.imagesFolder);

  await model.findOneAndUpdate({ _id }, req.body);
};

/**
 * Delete one item by ID
 */
const deleteItem = async (_id, model) => {
  const data = await model.findOne({ _id });

  fs.rmSync("./public/" + data.imagesFolder, { recursive: true });
  await model.deleteOne({ _id });
};

module.exports = {
  createItem,
  readOneItem,
  updateOneItem,
  deleteItem
};
