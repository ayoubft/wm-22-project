const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres@localhost:5432/wm-22-precip-DB",
  ssl: process.env.DATABASE_URL ? true : false,
});

module.exports = pool;
