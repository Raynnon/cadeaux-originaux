const express = require("express");
const fs = require("fs-extra");
const multer = require("multer");
const router = new express.Router();
const db = require("../database/postgre");

/* READ PRODUCTS */
router.get("/products", async (req, res) => {
  try {
    const products = await db.select().from("products");
    res.send(products);
  } catch (e) {
    console.log(e);
    res.status(200).send("Server unavailable");
  }
});

/* ADD PRODUCT */
const tempFolder = "../images/products/temp";

//if temporary Folder does not exist, create it
if (!fs.existsSync(tempFolder)) {
  fs.mkdir(tempFolder);
}
const storage = multer.diskStorage({
  //put the files in the temporary folder
  destination: (req, file, cb) => cb(null, tempFolder),

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/addProduct", upload.array("image"), async (req, res) => {
  try {
    const imagesFolder = "../images/products/" + req.body.name;

    //Copy temp folder to the image folder
    fs.copy(tempFolder, imagesFolder, () => {
      fs.readdir(tempFolder, (err, files) => {
        files.forEach(async (file) => {
          await fs.unlinkSync(tempFolder + "/" + file);
        });
      });
    });

    console.log(req.files, req.body);
    res.send(req.body);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

module.exports = router;
