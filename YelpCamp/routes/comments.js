var express = require("express");
var router = express.Router({mergeParams: true}); // this object makes the params available here
var Camp = require("../models/camp");
var Comment = require("../models/comment");

// NEW ROUTE
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

// CREATE ROUTE
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
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save();
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

// EDIT ROUTE
router.get("/:commentId/edit", checkUser, function(req, res) {
	var campId = req.params.id;
	var commentId = req.params.commentId;
	Comment.findById(commentId, function(err, comment) {
		if(err) {
			console.log(err);
			res.redirect("back");
		} else {
			res.render("comments/edit", {campId: campId, comment: comment});
		}
	});
});

// UPDATE ROUTE
router.put("/:commentId", checkUser, function(req, res) {
	var campId = req.params.id;
	var commentId = req.params.commentId;
	var newComment = req.body.comment;
	Comment.findByIdAndUpdate(commentId, newComment, function(err, comment) {
		if(err) {
			console.log(err);
			res.redirect("back");
		} else {
			res.redirect("/camps/" + campId);
		}
	});
});

// DESTROY ROUTE
router.delete("/:commentId", checkUser, function(req, res) {
	var campId = req.params.id;
	var commentId = req.params.commentId;
	Comment.findByIdAndRemove(commentId, function(err) {
		if(err) {
			console.log(err);
			res.redirect("/camps");
		} else {
			res.redirect("/camps/" + campId);
		}
	});
});


// Middlewares
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

function checkUser(req, res, next) {
	var campId = req.params.id;
	var commentId = req.params.commentId;
	Comment.findById(commentId, function(err, comment) {
		if(req.user && req.user._id.equals(comment.author.id)) {
			return next();
		}
		res.redirect("/camps/" + campId);
	});

}

module.exports = router;