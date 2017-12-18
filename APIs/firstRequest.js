var request = require("request");
request("https://goo.gl/EezBV5", function (error, response, body) {
  console.log("error:", error);
  console.log("statusCode:", response && response.statusCode);
  console.log("body:", body);
  var object = JSON.parse(body);
  console.log("Sunset in Hawaii:", object.query.results.channel.astronomy.sunset);
});