const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  port: 5432,
  password: "",
  database: process.env.DATABASE,
});

module.exports = pool;
