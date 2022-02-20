const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "",
  database: "wm-22-precip-DB",
});

module.exports = pool;
