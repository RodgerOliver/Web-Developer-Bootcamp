var Camp = require("../models/camp");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

middlewareObj.checkUserCamp = function (req, res, next) {
	var id = req.params.id;
	Camp.findById(id, function(err, camp) {
		if(err) {
			console.log(err);
			res.redirect("/camps");
		} else {
			if(req.user && req.user._id.equals(camp.author.id)) {
				return next();
			}
			res.redirect("/camps/" + id);
		}
	});
}

middlewareObj.checkUserComment = function (req, res, next) {
	var campId = req.params.id;
	var commentId = req.params.commentId;
	Comment.findById(commentId, function(err, comment) {
		if(req.user && req.user._id.equals(comment.author.id)) {
			return next();
		}
		res.redirect("/camps/" + campId);
	});
}

module.exports = middlewareObj;