const fs = require("fs-extra");
const multer = require("multer");

const uploadFile = (tempFolder = "./public/temp") => {
  //if temporary Folder does not exist, create it
  if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder);
  }

  const storage = multer.diskStorage({
    //put the files in the temporary folder
    destination: (req, file, cb) => cb(null, tempFolder),
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const upload = multer({ storage: storage });

  return upload.array("image");
};

module.exports = uploadFile;
