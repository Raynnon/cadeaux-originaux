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

  /* const arrOptionParameters = ["whoType", "price"];
  console.log(params); */

  const addOptions = (optionParam) => {
    if (params[optionParam]) {
      console.log(params[optionParam].test(/,/));
      options[optionParam] = params[optionParam];
    }
  };

  simpleOptionParameters.forEach((item) => {
    addOptions(item);
  });

  const data = await model.find(options).lean().exec();

  return imageToDataAdder(data);
};

module.exports = { read };
