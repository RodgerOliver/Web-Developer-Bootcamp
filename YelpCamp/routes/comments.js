var express = require("express");
var router = express.Router({mergeParams: true}); // this makes the params available here
var Camp = require("../models/camp");
var Comment = require("../models/comment");

// COMMENTS NEW
router.get("/new", isLoggedIn, function(req, res) {
	var id = req.params.id;
	Camp.findById(id, function(err, camp) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {camp: camp});
		}
	});
});

// COMMENTS CREATE
router.post("/", isLoggedIn, function(req, res) {
	var id = req.params.id;
	var comment = req.body.comment;
	Camp.findById(id, function(err, camp) {
		if(err) {
			console.log(err);
			res.redirect("/camps");
		} else {
			Comment.create(comment, function(err, newComment) {
				if(err) {
					console.log(err);
					res.redirect("/camps/" + id);
				} else {
					camp.comments.push(newComment);
					camp.save(function(err, data) {
						if(err) {
							console.log(err);
						} else {
							res.redirect("/camps/" + id);
						}
					});
				}
			});
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