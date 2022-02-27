// Requiring module
const express = require("express");
const pool = require("./connection.js");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Set public as static directory
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(bodyParser.json());
// Server setup
app.listen(port, () => console.log(`Listening at ${port}`));

let data;

app.post("/api", (request, response) => {
  console.log("I got a request !");
  console.log(request.body);
  data = request.body;
  response.json({
    status: "success",
    query: data.q,
  });
  app.get("/api", (req, res) => {
    pool.query(data.q, (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    });
    // pool.end();
  });
  pool.connect();
});

app.post("/api2", (request, response) => {
  console.log("I got a request !");
  console.log(request.body);
  data = request.body;
  response.json({
    status: "success",
    query: data.q,
  });
  app.get("/api2", (req, res) => {
    pool.query(data.q, (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    });
    // pool.end();
  });
  pool.connect();
});
