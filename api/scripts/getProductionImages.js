const axios = require("axios");
const download = require("image-downloader");

const dotenv = require("dotenv");
var fs = require("fs");

dotenv.config();

const getProductionImages = async () => {
  const productsImages = await axios.get(
    `${process.env.PRODUCTION_URL}/products?images=true`
  );

  productsImages.data.forEach((product) => {
    const dir = product.imagesFolder;

    // If folder does not exists - Create folder then add pictures inside
    if (!fs.existsSync("./public/" + dir)) {
      try {
        fs.mkdirSync("./public/" + dir);
        product.images.forEach(async (imageUrl) => {
          const options = {
            url: imageUrl,
            dest: "./public/" + dir
          };
          await download.image(options);
        });
      } catch (e) {
        console.log("Images download failed");
      }
    }
  });
};

module.exports = getProductionImages;
