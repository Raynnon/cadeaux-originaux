const mongoose = require('mongoose');
const getProductionImages = require('../scripts/getProductionImages');
const dotenv = require('dotenv');
const fs = require('fs');
const { dumpDB, restoreDB } = require('./copyDatabase.js');

dotenv.config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  PRODUCTION_DB_NAME,
  PRODUCTION_URL
} = process.env;

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

if (process.env.DEVELOPMENT_MOD) {
  getProductionImages(`${PRODUCTION_URL}/products?images=true`);

  const copyDB = async () => {
    if (!fs.existsSync('./database/backup/')) {
      //DUMP PROD DATABASE
      await dumpDB(DB_USER, DB_PASSWORD, DB_HOST, PRODUCTION_DB_NAME);
    }
    //COPY PROD DATABASE IN DEV DATABASE
    await restoreDB(DB_USER, DB_PASSWORD, DB_HOST, DB_NAME);
  };

  copyDB();
}
