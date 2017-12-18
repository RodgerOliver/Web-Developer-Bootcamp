var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var camps = [
	{name: "Samom Creek", image: "http://photosforclass.com/download/7360193870"},
	{name: "Granite Hill", image: "http://photosforclass.com/download/2069978635"},
	{name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/2770459706"}
];


app.get("/", function(req, res) {
	res.render("home");
});

app.get("/camps", function(req, res) {
	res.render("camps", {
		camps: camps
	});
});

app.post("/camps", function(req, res) {
	var name = req.body.name;
	var url = req.body.url;
	var newCamp = {name: name, image: url}
	camps.push(newCamp);
	res.redirect("/camps");
});

app.get("/camps/new", function(req, res) {
	res.render("newCamp");
});

app.listen(3000, function() {
	console.log("Working on port 3000!");
});