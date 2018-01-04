var express = require("express");
var router = express.Router();
var Camp = require("../models/camp");
var middleware = require("../middlewares");

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
router.post("/", middleware.isLoggedIn, function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {id: req.user._id, username: req.user.username};
	var newCamp = {
		name: name,
		image: image,
		description: description,
		author: author
	};
	Camp.create(newCamp, function(err, newCamp) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/camps/" + newCamp._id);
		}
	});
});

// NEW - show form to create a new camp
router.get("/new", middleware.isLoggedIn, function(req, res) {
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

// EDIT ROUTE
router.get("/:id/edit", middleware.checkUserCamp, function(req, res) {
	var id = req.params.id;
	Camp.findById(id, function(err, camp) {
		if(err) {
			console.log(err);
		} else {
			res.render("camps/edit", {camp: camp});
		}
	});
});

// UPDATE ROUTE
router.put("/:id", middleware.checkUserCamp, function(req, res) {
	var id = req.params.id;
	var updateCamp = req.body.update;
	Camp.findByIdAndUpdate(id, updateCamp, function(err, camp) {
		if(err) {
			console.log(err);
			res.redirect("/camps/" + id);
		} else {
			res.redirect("/camps/" + id);
		}
	});
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkUserCamp, function(req, res) {
	var id = req.params.id;
	Camp.findByIdAndRemove(id, function(err) {
		if(err) {
			console.log(err);
			res.redirect("/camps/" + id);
		} else {
			res.redirect("/camps");
		}
	});
});

module.exports = router;