const fs = require("fs-extra");

const moveFile = async (
  imagesFolder = "./public/images",
  tempFolder = "./public/temp"
) => {
  try {
    await fs.copy(tempFolder, imagesFolder);

    if (fs.existsSync(tempFolder)) {
      fs.rmdirSync(tempFolder, { recursive: true });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = moveFile;
