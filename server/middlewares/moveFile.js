const fs = require("fs-extra");

const moveFile = (imagesFolder = "./public/images", tempFolder = "./temp") => {
  try {
    fs.copy(tempFolder, imagesFolder, () => {
      fs.readdir(tempFolder, (err, files) => {
        if (err) {
          console.log(err);
        }

        files.forEach(async (file) => {
          await fs.unlinkSync(tempFolder + "/" + file);
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = moveFile;
