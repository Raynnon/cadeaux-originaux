const fs = require("fs-extra");

const imageToDataAdder = async (data) => {
  const dataToSend = {
    ...data
  };

  filesDirectory = "./public/" + data.imagesFolder;

  if (fs.existsSync(filesDirectory)) {
    dataToSend.images = [];

    const files = await fs.readdir("./public/" + data.imagesFolder);

    for (const file of files) {
      dataToSend.images.push(
        process.env.APP_URL + data.imagesFolder + "/" + file
      );
    }
  }

  return dataToSend;
};

module.exports = imageToDataAdder;
