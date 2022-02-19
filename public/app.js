// First import the http module
http = require("http");

// Set the options to be used by the http request
var options = {
  host: "localhost",
  port: "8080",
  path: "/index.html",
};

//Create a callback function that would handle the response
var callback = function (response) {
  var responseBody = "";
  response.on("data", function (data) {
    responseBody = responseBody + data; //continuously update the response
  });
  response.on("end", function () {
    // All data received
    console.log(responseBody);
  });
};

//Now make the request to the server
var request = http.request(options, callback);
request.end();
