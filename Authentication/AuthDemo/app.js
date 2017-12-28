var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	localStrategy = require("passport-local"),
	expressSession = require("express-session"),
	passportLocalMongoose = require("passport-local-mongoose");
	app = express();

app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/auth_demo");
mongoose.Promise = global.Promise;

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/secret", function(req, res) {
	res.render("secret");
});

app.listen(3000, function() {
	console.log("Working on port 3000!");
});