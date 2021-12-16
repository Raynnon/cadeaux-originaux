const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
require("./database/mongoDB");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
