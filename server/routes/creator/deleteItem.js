const fs = require("fs");

const deleteItem = async (_id, model) => {
  const data = await model.findOne({ _id });
  console.log(data);
  fs.rmdirSync("./public/" + data.imagesFolder, { recursive: true });
  await model.deleteOne({ _id });
};

module.exports = deleteItem;
