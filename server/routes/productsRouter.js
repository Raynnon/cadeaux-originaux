const express = require("express");
const { readdir } = require("fs/promises");
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

  const files = await readdir("./public/" + product.imagesFolder);

  for (const file of files) {
    productToSend.images.push(
      process.env.APP_URL + product.imagesFolder + "/" + file
    );
  }

  return productToSend;
};

/* READ PRODUCTS */
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}).lean();
    const productsToSend = [];

    for (const product of products) {
      productsToSend.push(await toSend(product));
    }

    res.send(productsToSend);
  } catch (e) {
    console.log(e);
    res.status(200).send();
  }
});

/* READ PRODUCTS BY ID */
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();

    res.send(await toSend(product));
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
