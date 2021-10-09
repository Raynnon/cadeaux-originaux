const readAllItems = require("../crud/readAllItems");
const readOneItem = require("../crud/readOneItem");

const read = async (model, params) => {
  console.log(params);
  if (Object.keys(params).length) {
    //const newData = await model.find({ _id }).lean().exec();
    const data = await readOneItem(params.id, model);

    return data;
  }

  return await readAllItems(model);
};

module.exports = { read };
