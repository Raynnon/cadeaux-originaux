const express = require("express");
const fs = require("fs-extra");
const util = require("util");
const slugify = require("slugify");

const Product = require("../Models/Product");
const uploadFile = require("../middlewares/uploadFile");
const moveFile = require("../middlewares/moveFile");

const router = new express.Router();

const toSend = async (product) => {
  const productToSend = {
    ...product,
    images: []
  };

  const readdir = util.promisify(fs.readdir);

  const dirImages = await readdir(
    "./public/" + product.imagesFolder,
    (err, files) => {
      if (files) {
        const productImages = [];

        files.forEach((file) => {
          productImages.push(
            process.env.APP_URL + product.imagesFolder + "/" + file
          );
        });

        productToSend.images = productImages;

        return productToSend;
      } else {
        console.log(`Unable to reach ${product.imagesFolder}`);

        return productToSend;
      }
    }
  );

  return productToSend;
};

/* READ PRODUCTS */
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    const productsToSend = products.map((product) => {});

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

    res.send(toSend(product));
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

/* ADD PRODUCT */
router.post("/products", uploadFile(), async (req, res) => {
  try {
    const imagesFolder =
      "images/products/" + slugify(req.body.name, { trim: true, lower: true });

    moveFile("./public/" + imagesFolder);

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
      ...req.body
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
