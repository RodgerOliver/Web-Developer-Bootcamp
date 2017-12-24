var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");

app.use(bodyParser.urlencoded({extended: true})); // tell express to use body-parser to create the req.body
app.set("view engine", "ejs");

var DB = "data/data.js";
var file = fs.readFileSync(DB);
var friends = JSON.parse(file);

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/friends", function(req, res) {
	res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res) {
	var newFriend = req.body.newFriend;
	friends.push(newFriend);
	var friendsString = JSON.stringify(friends);
	fs.writeFile(DB, friendsString);
	res.redirect("/friends");
})

app.get("*", function(req, res) {
	res.send("This route doesn't exists");
});

app.listen(3000, function() {
	console.log("Working on port 3000");
});