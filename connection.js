const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres@localhost:5432/wm-22-precip-DB",
});

module.exports = pool;
