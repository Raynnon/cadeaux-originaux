const Product = require("../Models/Product");
const helpers = require("./helpers");

module.exports = (router) => {
  helpers.crud(router, "products", Product);
  router.get("/products/hello/world", (req, res) => {
    res.send("foo");
  });
};
