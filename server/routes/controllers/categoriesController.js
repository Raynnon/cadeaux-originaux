const imageToDataAdder = require("../crud/tools/imageToDataAdder");

const read = async (model, ordered) => {
  const datas = await model.find({}).lean().exec();
  let organisedDatas = [];
  const dataToSend = [];

  if (ordered) {
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
