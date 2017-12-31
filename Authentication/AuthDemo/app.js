var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	localStrategy = require("passport-local"),
	expressSession = require("express-session"),
	passportLocalMongoose = require("passport-local-mongoose"),
	User = require("./models/user"),
	app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/auth_demo");
mongoose.Promise = global.Promise;
// ExpressSession Setup
app.use(expressSession({
	secret: "Parkour is the best sport ever",
	resave: false,
	saveUninitialized: false
}));
// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser()); // Read, take the data and ENCODE the session
passport.deserializeUser(User.deserializeUser());// Read, take the data and UNENCODE the session


// ========== ROUTES ==========
app.get("/", function(req, res) {
	res.render("home");
});

app.get("/secret", function(req, res) {
	res.render("secret");
});

// AUTH ROUTES
app.get("/register", function(req, res) {
	res.render("register");
});

app.post("/register", function(req, res) {
	var name = req.body.name;
	var password = req.body.password;
	User.register(new User({username: name}), password, function (err, user) {
		if(err) {
			console.log(err);
			res.render("register");
		} else {
			passport.authenticate("local")(req, res, function() {
				res.redirect("/secret");
			});
		}
	});
});

app.listen(3000, function() {
	console.log("Working on port 3000!");
});