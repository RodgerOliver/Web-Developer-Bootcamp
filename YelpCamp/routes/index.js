var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

// ROOT ROUTE
router.get("/", function(req, res) {
	res.render("home");
});

// AUTH ROUTES
// register
router.get("/register", function(req, res) {
	res.render("register");
});

router.post("/register", function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	User.register(new User({username: username}), password, function(err, newUser) {
		if(err) {
			console.log(err);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/camps");
		});
	});
});

// login
router.get("/login", function(req, res) {
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/camps",
	failureRedirect: "/login"
}));

// logout
router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/camps");
});

// middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;