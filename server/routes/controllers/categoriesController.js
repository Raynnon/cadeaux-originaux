const imageToDataAdder = require("../crud/tools/imageToDataAdder");
const readOneItem = require("../crud/readOneItem");

const read = async (model, params) => {
  const datas = await model.find({}).lean().exec();
  let organisedDatas = [];
  const dataToSend = [];

  if (params.id) {
    const data = await readOneItem(params.id, model);

    return data;
  }

  if (!params.ordered) {
    organisedDatas = datas;
  } else {
    const menu = {};

    datas.forEach((category) => {
      if (!category.parent.length) {
        menu[category.name] = [];
      }
    });

    datas.forEach((dataItem) => {
      Object.keys(menu).forEach((menuItem) => {
        if (dataItem.parent.includes(menuItem)) {
          menu[menuItem].push(dataItem);
        }
      });
    });

    organisedDatas.push(menu);
  }

  for (const data of organisedDatas) {
    dataToSend.push(await imageToDataAdder(data));
  }

  return dataToSend;
};

module.exports = { read };
