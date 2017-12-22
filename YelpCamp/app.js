var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var DB = "dataBase/data.js";
var file = fs.readFileSync(DB);
var camps = JSON.parse(file);


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
	var newCamp = {"name": name, "image": url}
	camps.push(newCamp);
	var campsString = JSON.stringify(camps, null, 2);
	fs.writeFile(DB, campsString);
	res.redirect("/camps");
});

app.get("/camps/new", function(req, res) {
	res.render("newCamp");
});

app.listen(3000, function() {
	console.log("Working on port 3000!");
});