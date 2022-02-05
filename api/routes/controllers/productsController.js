const imageToDataAdder = require("../crud/tools/imageToDataAdder");
const updateOneItem = require("../crud/updateOneItem");
const auth = require("../../middlewares/authMiddleware");

const read = async (model, params) => {
  if (params) {
    const simpleOptionParameters = [
      "name",
      "_id",
      "whoKind",
      "whoType",
      "occasions",
      "parties",
      "price"
    ];

    const options = Object.fromEntries(
      simpleOptionParameters
        .filter((element) => {
          return params[element];
        })
        .map((item) => {
          if (params[item].includes(",")) {
            return [item, { $in: params[item].split(",") }];
          } else if (item === "name") {
            return ["name", { $regex: ".*" + params[item], $options: "i" }];
          } else {
            return [item, { $in: params[item] }];
          }
        })
    );

    let sort =
      params.sortBy === "Meilleures ventes" && !params.count
        ? { visits: -1 }
        : { editedAt: -1 };

    let skip =
      params.currentPage && params.productsPerPage && !params.count
        ? (params.currentPage - 1) * params.productsPerPage
        : 0;

    if (params.count) {
      const documentsCounter = await model.countDocuments(options);

      return { numberOfProducts: documentsCounter };
    }

    const data = await model
      .find(options)
      .skip(skip)
      .sort(sort)
      .lean()
      .limit(Number(params.productsPerPage))
      .exec();

    if (params.images) {
      return await imageToDataAdder(data);
    } else {
      return data;
    }
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
