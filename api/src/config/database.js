const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const {
  MONGODB_URI,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
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

// Flag to track if we're using fallback database
let useFallbackDatabase = false;

const connectDatabase = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log('MongoDB connected successfully');
    useFallbackDatabase = false;
  } catch (error) {
    console.error('MongoDB connection error:', error && error.message ? error.message : error);
    console.warn('⚠️  Using fallback database from JSON file');
    useFallbackDatabase = true;
  }
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err && err.message ? err.message : err);
  console.warn('⚠️  Switching to fallback database');
  useFallbackDatabase = true;
});

const isUsingFallback = () => useFallbackDatabase;

module.exports = connectDatabase;
module.exports.isUsingFallback = isUsingFallback;
