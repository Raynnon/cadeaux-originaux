const jwt = require("jsonwebtoken");

const login = (router) => {
  router.post("/login", async (req, res) => {
    try {
      const { USERNAME, PASSWORD, PASSPHRASE } = process.env;
      if (req.body.username === USERNAME && req.body.password === PASSWORD) {
        const token = jwt.sign({ username: req.body.username }, PASSPHRASE);

        res.send(token);
      } else {
        throw new Error("Unable to login");
      }
      res.send();
    } catch (e) {
      res.status(401).send(e);
    }
  });
};

module.exports = { login };
