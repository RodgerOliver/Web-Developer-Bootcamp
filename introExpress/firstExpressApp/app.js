var express = require("express");
var app = express();


app.get("/", function(req, res) {
	res.send("Hi There!");
});

app.get("/bye", function(req, res) {
	console.log("SOMEONE MADE A REQUEST TO /bye");
	res.send("Bye guys!");
});

app.get("/r/:subredditName", function(req, res) {
	console.log(req.params);
	var subreddit = req.params.subredditName;
	res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!!");
});

app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
	res.send("welcome to the comments page");
});

//when the route doesn't exists use "*" to send the page  
app.get("*", function(req, res) {
	res.send("This page doesn't exists");
});

// what port the server is running
app.listen(3000, function() {
	console.log("working on port 3000");
});