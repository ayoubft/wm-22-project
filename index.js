const express = require("express");
const pool = require("./connection.js");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at ${port}`));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(bodyParser.json());

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
