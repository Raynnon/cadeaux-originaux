const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Routes
app.use(router);

module.exports = app;
