const jwt = require("jsonwebtoken");

/**
 * Handle user login
 */
const login = async (req, res) => {
  try {
    const { USERNAME, PASSWORD, PASSPHRASE } = process.env;
    if (req.body.username === USERNAME && req.body.password === PASSWORD) {
      const token = jwt.sign(
        { username: req.body.username, password: req.body.password },
        PASSPHRASE
      );

      res.send(token);
    } else {
      throw new Error("Unable to login");
    }
  } catch (e) {
    res.status(401).send(e);
  }
};

module.exports = { login };
