const mongoose = require('mongoose');
const getProductionImages = require('../scripts/getProductionImages');
const dotenv = require('dotenv');
const fs = require('fs');
const { dumpDB, restoreDB } = require('./copyDatabase.js');

dotenv.config();

const {
  MONGODB_URI,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  PRODUCTION_DB_NAME,
  PRODUCTION_URL
} = process.env;

// Prefer a single full URI if provided, otherwise build from parts
const normalizedHost = DB_HOST
  ? DB_HOST.endsWith('/')
    ? DB_HOST
    : `${DB_HOST}/`
  : '';
const normalizedDbName = DB_NAME ? DB_NAME.replace(/^\//, '') : '';
const builtUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${normalizedHost}${normalizedDbName}?retryWrites=true&w=majority`;
const url = MONGODB_URI || builtUri;

if (!MONGODB_URI && (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_NAME)) {
  console.error(
    'MongoDB configuration missing. Provide MONGODB_URI or set DB_USER, DB_PASSWORD, DB_HOST, DB_NAME.'
  );
}

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err && err.message ? err.message : err);
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
