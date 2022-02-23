const { Pool } = require("pg");

// const pool = new Pool({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "",
//   database: "wm-22-precip-DB",
// });

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres@localhost:5432/wm-22-precip-DB",
  ssl: process.env.DATABASE_URL
    ? {
        rejectUnauthorized: true,
      }
    : false,
});

module.exports = pool;
