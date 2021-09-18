const imageToDataAdder = require("./tools/imageToDataAdder");

const readOneItem = async (id, model) => {
  const data = await model.findById(id).lean().exec();
  return imageToDataAdder(data);
};

module.exports = readOneItem;
