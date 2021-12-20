const imageToDataAdder = require("../crud/tools/imageToDataAdder");
const updateOneItem = require("../crud/updateOneItem");

const read = async (model, params) => {
  const options = {};
  let imagesFolder = "";
  let sort = "";
  let skip = 0;

  if (params) {
    Object.keys(params).forEach((param) => {
      if (params[param].includes(",")) {
        const paramsArray = params[param].split(",");

        options[param] = { $in: paramsArray };
      } else {
        param === "images" && params.images === "true"
          ? (imagesFolder = "imagesFolder")
          : (options[param] = params[param]);
      }
    });

    if (params.count === "true") {
      const documentsCounter = await model.countDocuments(options);

      return { numberOfProducts: documentsCounter };
    } else {
      // SORT
      if (params.sortBy) {
        if (params.sortBy === "Meilleures ventes") {
          sort = { visits: -1 };
        } else {
          sort = { editedAt: -1 };
        }
      }

      // PRODUCTS PER PAGE
      if (params.currentPage && params.productsPerPage) {
        //skipping products depending on the number of pages
        skip = (params.currentPage - 1) * params.productsPerPage;
      }
    }

    const data = await model
      .find(options, imagesFolder)
      .skip(skip)
      .sort(sort)
      .lean()
      .limit(Number(params.productsPerPage))
      .exec();

    return await imageToDataAdder(data);
  }
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
