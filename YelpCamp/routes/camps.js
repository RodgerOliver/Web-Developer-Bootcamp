var express = require("express");
var router = express.Router();
var Camp = require("../models/camp");

// INDEX - show all camps
router.get("/", function(req, res) {
	Camp.find({}, function(err, camps) {
		if(err) {
			console.log(err);
		} else {
			res.render("camps/index", {camps: camps});
		}
	});
});

// CREATE - add new camp to DB
router.post("/", isLoggedIn, function(req, res) {
	var name = req.body.name;
	var url = req.body.url;
	var description = req.body.description;
	var newCamp = {name: name, image: url, description: description};
	Camp.create(newCamp, function(err, newCamp) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/camps");
		}
	});
});

// NEW - show form to create a new camp
router.get("/new", isLoggedIn, function(req, res) {
	res.render("camps/new");
});

// SHOW - show more info about one camp
router.get("/:id", function(req, res) {
	var id = req.params.id;
	// fill the 'comment' field of the camp
	Camp.findById(id).populate("comments").exec(function(err, campById) {
		if(err) {
			console.log(err);
		} else {
			res.render("camps/show", {camp: campById});
		}
	});
});

// middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;