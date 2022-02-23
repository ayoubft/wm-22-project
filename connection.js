const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres@localhost:5432/wm-22-precip-DB",
  ssl: {
    rejectUnauthorized: process.env.SSL_BOOL,
  },
});

module.exports = pool;
