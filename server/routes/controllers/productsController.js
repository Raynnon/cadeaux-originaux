const imageToDataAdder = require("../crud/tools/imageToDataAdder");
const updateOneItem = require("../crud/updateOneItem");

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

const updateOne = async (req, model) => {
  if (req.body.visits === "true") {
    const _id = req.params.id;

    await model.findByIdAndUpdate(_id, { $inc: { visits: 1 } });
    delete req.body.visits;
  }

  await updateOneItem(req, model);
};

module.exports = { read, updateOne };
