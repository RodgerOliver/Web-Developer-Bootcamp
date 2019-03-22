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
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // Read, take the data and ENCODE the session
passport.deserializeUser(User.deserializeUser());// Read, take the data and UNENCODE the session


// ========== ROUTES ==========
app.get("/", function(req, res) {
	res.render("home");
});
// another middleware to check if the user is logged in
app.get("/secret", isLoggedIn, function(req, res) {
	res.render("secret");
});

// AUTH ROUTES
// ----- Register -----
app.get("/register", function(req, res) {
	res.render("register");
});

app.post("/register", function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	User.register(new User({username: username}), password, function (err, user) {
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

// ----- Login -----
app.get("/login", function(req, res) {
	res.render("login");
});

// middleware - some code that runs between the start and the end of the route
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function(req, res) {

});

// ----- Logout -----
app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

app.listen(3000, function() {
	console.log("Working on port 3000!");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}