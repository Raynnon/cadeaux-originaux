const moveFile = require("../../middlewares/moveFile.js");
const fs = require("fs");

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

module.exports = updateOneItem;
