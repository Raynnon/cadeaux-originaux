const express = require("express");
const fs = require("fs-extra");
const Product = require("../Models/Product");

const multer = require("multer");
const slugify = require("slugify");

const router = new express.Router();

/* READ PRODUCTS */
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (e) {
    console.log(e);
    res.status(200).send();
  }
});

/* READ PRODUCTS BY ID */
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    /* const productToSend = {
      id: product?._id,
      name: product?.name,
      price: product?.price,
      description: product?.description,
      strongPoints: product?.strongPoints,
      whoKind: product?.whoKind,
      whoType: product?.whoType,
      occasions: product?.occasions,
      parties: product?.parties,
      visits: product?.visits,
      urlAmazon: product?.urlAmazon,
      createdAt: product?.createdAt,
      editedAt: product?.editedAt,
    };

    console.log(productToSend);
 */
    res.send(product);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

/* ADD PRODUCT */
const tempFolder = "./images/products/temp";

//if temporary Folder does not exist, create it
if (!fs.existsSync(tempFolder)) {
  fs.mkdir(tempFolder);
}

const storage = multer.diskStorage({
  //put the files in the temporary folder
  destination: (req, file, cb) => cb(null, tempFolder),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/products", upload.array("image"), async (req, res) => {
  try {
    const imagesFolder =
      "./images/products/" +
      slugify(req.body.name, { trim: true, lower: true });

    //Copy temp folder to the image folder
    fs.copy(tempFolder, imagesFolder, () => {
      fs.readdir(tempFolder, (err, files) => {
        files.forEach(async (file) => {
          await fs.unlinkSync(tempFolder + "/" + file);
        });
      });
    });

    const newProduct = new Product({
      ...req.body,
      imagesFolder
    });

    await newProduct.save();

    res.send("Product added");
  } catch (e) {
    res.status(400).send(e);
  }
});

// EDIT PRODUCT BY ID
router.put("/products/:id", async (req, res) => {
  try {
    const toUpdate = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      strongPoints: req.body.strongPoints,
      whoKind: req.body.whoKind,
      whoType: req.body.whoType,
      occasions: req.body.occasions,
      parties: req.body.parties,
      urlAmazon: req.body.urlAmazon
    };

    const toUpdateNotNull = (obj) => {
      for (let propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
      return obj;
    };

    await Product.findOneAndUpdate(
      { _id: req.params.id },
      toUpdateNotNull(toUpdate)
    );

    res.send("Product updated");
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

// DELETE PRODUCT
router.delete("/products/:id", async (req, res) => {
  try {
    await await Product.deleteOne({ _id: req.params.id });

    res.send("Product deleted");
  } catch (e) {
    console.log(e);
    res.status(200).send();
  }
});

module.exports = router;
