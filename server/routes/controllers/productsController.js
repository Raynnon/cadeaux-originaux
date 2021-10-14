const imageToDataAdder = require("../crud/tools/imageToDataAdder");

const read = async (model, params) => {
  const options = {};
  const simpleOptionParameters = [
    "_id",
    "whoKind",
    "whoType",
    "occasions",
    "parties",
    "price"
  ];

  simpleOptionParameters.forEach((optionParam) => {
    if (params[optionParam]) {
      if (params[optionParam].includes(",")) {
        const paramsArray = params[optionParam].split(",");

        options[optionParam] = { $in: paramsArray };
      } else {
        options[optionParam] = params[optionParam];
      }
    }
  });

  const data = await model.find(options).lean().exec();

  return imageToDataAdder(data);
};

module.exports = { read };
