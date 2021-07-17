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
    res.status(200).send();
  }
});

/* READ PRODUCTS BY ID */
router.get("/products/:id", async (req, res) => {
  try {
    const product = await db
      .select()
      .from("products")
      .where("id", req.params.id);

    res.send(product);
  } catch (e) {
    console.log(e);
    res.status(400).send();
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

router.post("/products", upload.array("image"), async (req, res) => {
  try {
    const imagesFolder =
      "../images/products/" +
      req.body.name.toLowerCase().trim().split(/\s+/).join("-");

    //Copy temp folder to the image folder
    fs.copy(tempFolder, imagesFolder, () => {
      fs.readdir(tempFolder, (err, files) => {
        files.forEach(async (file) => {
          await fs.unlinkSync(tempFolder + "/" + file);
        });
      });
    });

    const {
      name,
      price,
      description,
      strong_points,
      who_kind,
      who_type,
      occasions,
      parties,
      url_amazon,
      url_ali,
    } = req.body;

    await db("products").insert({
      name,
      price,
      description,
      strong_points,
      who_kind,
      who_type,
      occasions,
      parties,
      url_amazon,
      url_ali,
      images_folder: imagesFolder,
    });

    res.send("Product added");
  } catch (e) {
    res.status(400).send(e);
  }
});

// DELETE PRODUCT
router.delete("/products/:id", async (req, res) => {
  try {
    await db("products").where("id", req.params.id).del();

    res.send("Product deleted");
  } catch (e) {
    console.log(e);
    res.status(200).send();
  }
});

module.exports = router;
