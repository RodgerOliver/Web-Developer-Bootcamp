var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
	res.render("home", {
		title: "YelpCamp"
	});
});

app.get("/camps", function(req, res) {
	var camps = [
		{name: "Samom Creek", image: "http://photosforclass.com/download/7360193870"},
		{name: "Granite Hill", image: "http://photosforclass.com/download/2069978635"},
		{name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/2770459706"}
	];

	res.render("camps", {
		title: "Campgrounds",
		camps: camps
	});
})

app.listen(3000, function() {
	console.log("Working on port 3000!");
});