const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "raynnon",
    password: "lol",
    database: "cadeauxoriginaux",
  },
});

module.exports = knex;
