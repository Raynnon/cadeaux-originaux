const imageToDataAdder = require("../crud/tools/imageToDataAdder");

const read = async (model, params) => {
  const options = {};
  const optionParameters = [
    "_id",
    "whoKind",
    "whoType",
    "occasions",
    "parties",
    "price"
  ];

  const addOptions = (optionParam) => {
    if (params[optionParam]) {
      options[optionParam] = params[optionParam];
    }
  };

  optionParameters.forEach((item) => {
    addOptions(item);
  });

  const data = await model.find(options).lean().exec();

  return imageToDataAdder(data);
};

module.exports = { read };
