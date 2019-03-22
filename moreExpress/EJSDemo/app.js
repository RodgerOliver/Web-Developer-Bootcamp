var express = require("express");
var app = express();

app.use(express.static("public")); //way to serve the public directory
app.set("view engine", "ejs"); // way to tell express that the app is using .ejs


app.get("/", function(req, res) {
	res.render("home", {
		title: "Home Page"
	});
});

app.get("/love/:thing", function(req, res) {
	var thing = req.params.thing;
	res.render("love", {
		title: "Love Page",
		thingVar: thing
	});
});

app.get("/posts", function(req, res) {
	var posts = [
		{title: "Post 1", author: "Rodger"},
		{title: "Post 2", author: "Marcio"},
		{title: "Post 3", author: "Regiane"}
	];
	res.render("posts", {
		title: "Posts",
		posts: posts
	})
});



app.get("*", function(req, res) {
	res.redirect("/");
});

app.listen(3000, function() {
	console.log("Working on port 3000");
});