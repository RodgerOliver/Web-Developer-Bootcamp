var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send("Hi There!");
});

app.get("/bye", function(req, res) {
	console.log("SOMEONE MADE A REQUEST TO /bye");
	res.send("Bye guys!");
});



app.listen(3000, function() {
	console.log("working on port 3000");
});