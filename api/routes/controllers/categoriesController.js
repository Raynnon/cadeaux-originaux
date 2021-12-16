const imageToDataAdder = require("../crud/tools/imageToDataAdder");
const updateOneItem = require("../crud/updateOneItem");

const read = async (model, params) => {
  const options = {};

  const optionAdder = (parameter) => {
    options[parameter] = params[parameter];
  };
  if (params._id) {
    optionAdder("_id");
  } else if (params.name) {
    optionAdder("name");
  }

  const data = await model.find(options).lean().exec();

  if (!params.ordered) {
    return await imageToDataAdder(data);
  } else {
    const menu = {};

    const fullData = await imageToDataAdder(data);

    data.forEach((category) => {
      if (!category.parent.length) {
        menu[category.name] = [];
      }
    });

    fullData.forEach((dataItem) => {
      Object.keys(menu).forEach((menuItem) => {
        if (dataItem.parent.includes(menuItem)) {
          menu[menuItem].push(dataItem);
        }
      });
    });

    return menu;
  }
};

const updateOne = async (req, model) => {
  return await updateOneItem(req, model);
};

module.exports = { read, updateOne };
