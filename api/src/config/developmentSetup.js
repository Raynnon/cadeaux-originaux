const fs = require('fs');
const { dumpDB, restoreDB } = require('../utils/copyDatabase');
const getProductionImages = require('../../scripts/getProductionImages');

const setupDevelopmentMode = async () => {
  const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    PRODUCTION_DB_NAME,
    PRODUCTION_URL
  } = process.env;

  if (!process.env.DEVELOPMENT_MOD) {
    return;
  }

  console.log('Running in development mode...');

  // Download production images
  getProductionImages(`${PRODUCTION_URL}/products?images=true`);

  // Copy production database
  const copyDB = async () => {
    if (!fs.existsSync('./database/backup/')) {
      // DUMP PROD DATABASE
      await dumpDB(DB_USER, DB_PASSWORD, DB_HOST, PRODUCTION_DB_NAME);
    }
    // COPY PROD DATABASE IN DEV DATABASE
    await restoreDB(DB_USER, DB_PASSWORD, DB_HOST, DB_NAME);
  };

  await copyDB();
};

module.exports = setupDevelopmentMode;
