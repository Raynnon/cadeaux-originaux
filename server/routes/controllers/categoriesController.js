const imageToDataAdder = require("../crud/tools/imageToDataAdder");

const read = async (model, params) => {
  const options = {};

  if (params._id) {
    options._id = params._id;
  }

  const data = await model.find(options).lean().exec();
  let organisedData = [];
  let dataToSend = [];

  if (!params.ordered) {
    organisedData = data;
  } else {
    const menu = {};

    data.forEach((category) => {
      if (!category.parent.length) {
        menu[category.name] = [];
      }
    });

    data.forEach((dataItem) => {
      Object.keys(menu).forEach((menuItem) => {
        if (dataItem.parent.includes(menuItem)) {
          menu[menuItem].push(dataItem);
        }
      });
    });

    organisedData.push(menu);
  }

  for (const data of organisedData) {
    dataToSend.push(await imageToDataAdder(data));
  }

  return dataToSend;
};

module.exports = { read };
