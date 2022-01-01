const mongoose = require("mongoose");
const getProductionImages = require("../scripts/getProductionImages");
const dotenv = require("dotenv");
const fs = require("fs");
const { exec } = require("child_process");
const { createCipheriv } = require("crypto");
const { stdout, stderr } = require("process");

dotenv.config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

if (process.env.DEVELOPMENT_MOD) {
  getProductionImages();

  if (!fs.existsSync("./database/backup/")) {
    try {
      // DUMP DATABASE
      const uriProd = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}${process.env.PRODUCTION_DB_DATABASE}`;
      const dumpDatabaseCmd = `mongodump --uri ${uriProd} --out ./database/backup/`;

      exec(dumpDatabaseCmd, (error, stdout, stderr) => {
        if (error) {
          console.log(error);
        } else {
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  //COPY PROD DATABASE IN DEV DATABASE
  const uriDev = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}${process.env.DB_DATABASE}`;
  const restoreDatabaseCmd = `mongorestore --uri ${uriDev} ./database/backup/cadeauxoriginaux`;

  exec(restoreDatabaseCmd, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
    }
  });
}
