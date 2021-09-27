const imageToDataAdder = require("./tools/imageToDataAdder");

const readAllItems = async (model) => {
  const datas = await model.find({}).lean().exec();
  let organisedDatas = [];
  const dataToSend = [];

  if (!datas[0].price) {
    const menu = { Genre: [], Type: [], Occasion: [], Fête: [] };

    datas.forEach((category) => {
      category.parent.forEach((item) => {
        if (
          item === "Genre" ||
          item === "Type" ||
          item === "Occasion" ||
          item === "Fête"
        ) {
          menu[item].push(category);
        }
      });
    });

    organisedDatas.push(menu);
  } else {
    organisedDatas = datas;
  }

  for (const data of organisedDatas) {
    dataToSend.push(await imageToDataAdder(data));
  }

  return dataToSend;
};

module.exports = readAllItems;
