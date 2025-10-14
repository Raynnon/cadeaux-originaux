const fs = require('fs-extra');

/**
 * Add image URLs to data items
 */
const imageToDataAdder = async (data) => {
  // Handle single item or array
  const items = Array.isArray(data) ? data : [data];

  const dataToSend = items.map(async (item) => {
    const filesDirectory = './public/' + item.imagesFolder;

    if (fs.existsSync(filesDirectory)) {
      const files = await fs.readdir(filesDirectory);
      const images = files.map((file) => {
        return process.env.APP_URL + item.imagesFolder + '/' + file;
      });
      const updatedItem = Object.assign(item, { images });
      return updatedItem;
    } else {
      return item;
    }
  });

  const result = await Promise.all(dataToSend);

  // Return single item if input was single item
  return Array.isArray(data) ? result : result[0];
};

module.exports = { imageToDataAdder };
