const moveFile = require("../../middlewares/moveFile.js");

const updateOneItem = async (req, model) => {
  const _id = req.params.id;
  const toUpdate = {
    ...req.body
  };

  const toUpdateNotNull = (obj) => {
    for (let propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  };

  const data = await model.findById(_id).lean().exec();
  moveFile("./public/" + data.imagesFolder);

  await model.findOneAndUpdate({ _id }, toUpdateNotNull(toUpdate));
};

module.exports = updateOneItem;
