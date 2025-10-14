const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth.controller");

// POST /login - Authenticate user
router.post("/login", login);

module.exports = router;
