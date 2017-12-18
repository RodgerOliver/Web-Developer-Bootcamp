var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("search");
})

app.get("/results", function(req, res) {
	var searchTerm = req.query.title;
	var url = "http://omdbapi.com/?s=" + searchTerm + "&apikey=thewdb"
	request(url, function (error, response, body) {
		var object = JSON.parse(body);
		res.render("results", {
			data: object
		});
	});
});


app.get("*", function(req, res) {
	res.send("This route doesn't exists!");
});

app.listen(3000, function() {
	console.log("Working on port 3000!");
});