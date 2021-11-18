const fs = require("fs-extra");

const imageToDataAdder = async (data) => {
  const dataToSend = data.map(async (item) => {
    filesDirectory = "./public/" + item.imagesFolder;

    if (fs.existsSync(filesDirectory)) {
      const files = await fs.readdir(filesDirectory);
      const images = files.map((file) => {
        return process.env.APP_URL + item.imagesFolder + "/" + file;
      });

      const updatedItem = Object.assign(item, { images });
      return updatedItem;
    } else {
      return item;
    }
  });

  return await Promise.all(dataToSend);
};

module.exports = imageToDataAdder;
