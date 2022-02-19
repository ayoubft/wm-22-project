const express = require("express");
const client = require('./connection.js')
const bodyParser = require("body-parser");

const app = express();

app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(bodyParser.json());

app.post("/api", (request, response) => {
  console.log("I got a request !");
  console.log(request.body);
  const data = request.body;
  response.json({
    status: "success",
    query: data.q,
  })
});

app.get('/api', (req, res)=>{
  client.query("SELECT * FROM testtable", (err, result)=>{
      if(!err){
          res.send(result.rows);
      }
  });
  client.end;
})
client.connect();