var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})); // tell express to use body-parser to create the req.body
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"]

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/friends", function(req, res) {
	
	res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res) {
	var newFriend = req.body.newFriend;
	friends.push(newFriend);
	res.redirect("/friends");
})

app.get("*", function(req, res) {
	res.send("This route doesn't exists");
});

app.listen(3000, function() {
	console.log("Working on port 3000");
});