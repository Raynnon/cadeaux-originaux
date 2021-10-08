const readAllItems = require("../crud/readAllItems");

const read = async (model) => {
  return await readAllItems(model);
};

module.exports = { read };
