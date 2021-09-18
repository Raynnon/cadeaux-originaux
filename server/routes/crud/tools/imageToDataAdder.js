const { readdir } = require("fs/promises");

const imageToDataAdder = async (data) => {
  const dataToSend = {
    ...data,
    images: []
  };

  const files = await readdir("./public/" + data.imagesFolder);

  for (const file of files) {
    dataToSend.images.push(
      process.env.APP_URL + data.imagesFolder + "/" + file
    );
  }

  return dataToSend;
};

module.exports = imageToDataAdder;
