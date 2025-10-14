const { imageToDataAdder } = require("../services/image.service");
const { createItem, updateOneItem, deleteItem } = require("../services/crud.service");
const { isUsingFallback } = require("../config/database");
const path = require("path");
const fs = require("fs");

/**
 * Load fallback database from JSON file
 */
const loadFallbackDatabase = () => {
  const fallbackPath = path.join(__dirname, "../../fallback-database.json");
  const data = fs.readFileSync(fallbackPath, "utf8");
  return JSON.parse(data);
};

/**
 * Get all categories
 */
const getCategories = async (req, res) => {
  try {
    const params = req.query;

    // Check if using fallback database
    if (isUsingFallback()) {
      const fallbackData = loadFallbackDatabase();
      let categories = fallbackData.categories;

      // Apply filters
      if (params._id) {
        categories = categories.filter(c => c._id === params._id);
      }
      if (params.name) {
        categories = categories.filter(c => c.name === params.name);
      }

      if (!params.ordered) {
        return res.send(categories);
      } else {
        const menu = {};

        categories.forEach((category) => {
          if (!category.parent || !category.parent.length) {
            menu[category.name] = [];
          }
        });

        categories.forEach((dataItem) => {
          Object.keys(menu).forEach((menuItem) => {
            if (dataItem.parent && dataItem.parent.includes(menuItem)) {
              menu[menuItem].push(dataItem);
            }
          });
        });

        return res.send(menu);
      }
    }

    // Normal MongoDB flow
    const { Category } = require("../models");
    const options = {};

    const optionAdder = (parameter) => {
      options[parameter] = params[parameter];
    };

    if (params._id) {
      optionAdder("_id");
    } else if (params.name) {
      optionAdder("name");
    }

    const data = await Category.find(options).lean().exec();

    if (!params.ordered) {
      return res.send(await imageToDataAdder(data));
    } else {
      const menu = {};

      const fullData = await imageToDataAdder(data);

      data.forEach((category) => {
        if (!category.parent.length) {
          menu[category.name] = [];
        }
      });

      fullData.forEach((dataItem) => {
        Object.keys(menu).forEach((menuItem) => {
          if (dataItem.parent.includes(menuItem)) {
            menu[menuItem].push(dataItem);
          }
        });
      });

      return res.send(menu);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
};

/**
 * Create a new category
 */
const createCategory = async (req, res) => {
  try {
    const { Category } = require("../models");
    await createItem(req, Category, "categories/");
    res.send();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

/**
 * Update a category by ID
 */
const updateCategory = async (req, res) => {
  try {
    const { Category } = require("../models");
    await updateOneItem(req, Category);
    res.send();
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
};

/**
 * Delete a category by ID
 */
const deleteCategory = async (req, res) => {
  try {
    const { Category } = require("../models");
    await deleteItem(req.params.id, Category);
    res.send();
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
