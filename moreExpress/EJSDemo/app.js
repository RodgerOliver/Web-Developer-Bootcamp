var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.render("home.ejs", {
		title: "Home Page"
	});
});

app.get("/love/:thing", function(req, res) {
	var thing = req.params.thing;
	res.render("love.ejs", {
		title: "Love Page",
		thingVar: thing
	});
});



app.get("*", function(req, res) {
	res.redirect("/");
});

app.listen(3000, function() {
	console.log("Working on port 3000");
});