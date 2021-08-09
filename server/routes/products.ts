import { Router, Request, Response } from "express";
const fs = require("fs-extra");
import multer from "multer";
const router = Router();
const db = require("../database/mongoDB");
import Product, { IProduct } from "../Models/Product";

/* READ PRODUCTS */
router.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (e) {
    console.log(e);
    res.status(200).send();
  }
});

/* READ PRODUCTS BY ID */
router.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).exec();

    res.send(product);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

/* ADD PRODUCT */
const tempFolder: string = "../images/products/temp";

//if temporary Folder does not exist, create it
if (!fs.existsSync(tempFolder)) {
  fs.mkdir(tempFolder);
}

const storage = multer.diskStorage({
  //put the files in the temporary folder
  destination: (req: Request, file: any, cb) => cb(null, tempFolder),
  filename: (req: Request, file: any, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post(
  "/products",
  upload.array("image"),
  async (req: Request, res: Response) => {
    try {
      const imagesFolder: string =
        "../images/products/" +
        req.body.name.toLowerCase().trim().split(/\s+/).join("-");

      //Copy temp folder to the image folder
      fs.copy(tempFolder, imagesFolder, () => {
        fs.readdir(tempFolder, (err: any, files: any) => {
          files.forEach(async (file: any) => {
            await fs.unlinkSync(tempFolder + "/" + file);
          });
        });
      });

      const {
        name,
        price,
        description,
        strongPoints,
        whoKind,
        whoType,
        occasions,
        parties,
        urlAmazon
      } = req.body;

      const newProduct: IProduct = new Product({
        name,
        price,
        description,
        strongPoints,
        whoKind,
        whoType,
        occasions,
        parties,
        urlAmazon,
        imagesFolder: imagesFolder
      });

      newProduct.save((err) => {
        if (err) {
          res.status(400).send(err);
        }
        res.send("Product added");
      });
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

// EDIT PRODUCT BY ID
router.put("/products/:id", async (req: Request, res: Response) => {
  try {
    interface InotNull {
      [key: string]: string | string[];
    }

    const toUpdate: InotNull = {
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

    const toUpdateNotNull = (obj: InotNull): InotNull => {
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
router.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    await await Product.deleteOne({ _id: req.params.id });

    res.send("Product deleted");
  } catch (e) {
    console.log(e);
    res.status(200).send();
  }
});

module.exports = router;
