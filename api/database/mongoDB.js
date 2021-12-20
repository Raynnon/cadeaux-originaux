const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

/* if (process.env.DEVELOPMENT_MOD) {
  db.runCommand({
    copydb: 1,
    fromhost: "myhost",
    username: "azureuser",
    fromdb: "test",
    todb: "test"
  });
} */
