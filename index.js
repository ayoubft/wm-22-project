const express = require("express");
const pg = require("pg");

const app = express();

app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static("public"));
