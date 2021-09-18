const imageToDataAdder = require("./tools/imageToDataAdder");

const readAllItems = async (model) => {
  const datas = await model.find({}).lean();
  const dataToSend = [];

  for (const data of datas) {
    dataToSend.push(await imageToDataAdder(data));
  }

  return dataToSend;
};

module.exports = readAllItems;
