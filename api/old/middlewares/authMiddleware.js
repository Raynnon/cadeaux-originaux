const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const { USERNAME, PASSWORD, PASSPHRASE } = process.env;
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, PASSPHRASE);

    if (decoded.username === USERNAME && decoded.password === PASSWORD) {
      next();
    }
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
