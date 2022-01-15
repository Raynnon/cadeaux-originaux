const moveFile = require("../../middlewares/moveFile.js");

const updateOneItem = async (req, model) => {
  const _id = req.params.id;
  const toUpdate = {
    ...req.body
  };

  // If property does not exists, delete property
  const toUpdateNotNull = (obj) => {
    const objFiltered = Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => {
        return value !== null && value !== undefined;
      })
    );

    return objFiltered;
  };

  const data = await model.findById(_id).lean().exec();
  moveFile("./public/" + data.imagesFolder);

  await model.findOneAndUpdate({ _id }, toUpdateNotNull(toUpdate));
};

module.exports = updateOneItem;
