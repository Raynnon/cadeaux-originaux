const { imageToDataAdder } = require("../services/image.service");
const { createItem, updateOneItem, deleteItem } = require("../services/crud.service");
const { isUsingFallback } = require("../config/database");
const { addUnsplashImages } = require("../services/unsplash.service");
const path = require("path");
const fs = require("fs");

/**
 * Load fallback database from JSON file
 */
const loadFallbackDatabase = () => {
  const fallbackPath = path.join(__dirname, "../../fallback-database.json");
  const data = fs.readFileSync(fallbackPath, "utf8");
  return JSON.parse(data);
};

/**
 * Filter products from fallback database
 */
const filterFallbackProducts = (products, params) => {
  let filtered = [...products];

  // Apply filters
  if (params.name) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(params.name.toLowerCase())
    );
  }
  if (params._id) {
    filtered = filtered.filter(p => p._id === params._id);
  }
  if (params.whoKind) {
    const kinds = params.whoKind.split(",");
    filtered = filtered.filter(p =>
      kinds.some(k => p.whoKind.includes(k))
    );
  }
  if (params.whoType) {
    const types = params.whoType.split(",");
    filtered = filtered.filter(p =>
      types.some(t => p.whoType.includes(t))
    );
  }
  if (params.occasions) {
    const occasions = params.occasions.split(",");
    filtered = filtered.filter(p =>
      occasions.some(o => p.occasions.includes(o))
    );
  }
  if (params.parties) {
    const parties = params.parties.split(",");
    filtered = filtered.filter(p =>
      parties.some(pa => p.parties.includes(pa))
    );
  }
  if (params.price) {
    filtered = filtered.filter(p => p.price === params.price);
  }

  // Sort
  if (params.sortBy === "Meilleures ventes") {
    filtered.sort((a, b) => (b.visits || 0) - (a.visits || 0));
  }

  return filtered;
};

/**
 * Get all products with filters
 */
const getProducts = async (req, res) => {
  try {
    const params = req.query;

    // Check if using fallback database
    if (isUsingFallback()) {
      const fallbackData = loadFallbackDatabase();
      let products = fallbackData.products;

      if (params.count) {
        const filtered = filterFallbackProducts(products, params);
        return res.send({ numberOfProducts: filtered.length });
      }

      products = filterFallbackProducts(products, params);

      // Pagination
      const currentPage = Number(params.currentPage) || 1;
      const productsPerPage = Number(params.productsPerPage) || products.length;
      const skip = (currentPage - 1) * productsPerPage;
      products = products.slice(skip, skip + productsPerPage);

      // Add Unsplash images if requested
      if (params.images) {
        products = addUnsplashImages(products, 1);
      }

      return res.send(products);
    }

    // Normal MongoDB flow
    const { Product } = require("../models");

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
        const documentsCounter = await Product.countDocuments(options);
        return res.send({ numberOfProducts: documentsCounter });
      }

      const data = await Product
        .find(options)
        .skip(skip)
        .sort(sort)
        .lean()
        .limit(Number(params.productsPerPage))
        .exec();

      if (params.images) {
        return res.send(await imageToDataAdder(data));
      } else {
        return res.send(data);
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
};

/**
 * Create a new product
 */
const createProduct = async (req, res) => {
  try {
    const { Product } = require("../models");
    await createItem(req, Product, "products/");
    res.send();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

/**
 * Update a product by ID
 */
const updateProduct = async (req, res) => {
  try {
    const { Product } = require("../models");

    // Increment visits if requested
    if (req.body.visits === "true") {
      const _id = req.params.id;
      await Product.findByIdAndUpdate(_id, { $inc: { visits: 1 } });
      delete req.body.visits;
    }

    await updateOneItem(req, Product);
    res.send();
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
};

/**
 * Delete a product by ID
 */
const deleteProduct = async (req, res) => {
  try {
    const { Product } = require("../models");
    await deleteItem(req.params.id, Product);
    res.send();
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
