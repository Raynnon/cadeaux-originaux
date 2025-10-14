const fs = require("fs-extra");

const moveFile = async (
  imagesFolder = "./public/images",
  tempFolder = "./public/temp"
) => {
  try {
    await fs.copySync(tempFolder, imagesFolder);

    const files = fs.readdirSync(tempFolder);
    files.forEach((file) => {
      fs.unlinkSync(tempFolder + "/" + file);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = moveFile;
