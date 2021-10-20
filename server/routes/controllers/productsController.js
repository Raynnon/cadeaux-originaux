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

  let sort = "";

  // SORT
  if (params.sortBy) {
    if (params.sortBy === "Meilleures ventes") {
      sort = { visits: -1 };
    } else {
      sort = { editedAt: -1 };
    }
  }

  // PRODUCTS PER PAGE
  let skip = 0;

  if (params.currentPage && params.productsPerPage) {
    //skipping products depending on the number of pages
    skip = (params.currentPage - 1) * params.productsPerPage;
  }

  const data = await model
    .find(options)
    .skip(skip)
    .sort(sort)
    .lean()
    .limit(Number(params.productsPerPage))
    .exec();

  return await imageToDataAdder(data);
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
