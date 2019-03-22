var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_ref", {useMongoClient: true});
mongoose.Promise = global.Promise;
// =============== REQUIRING MODELS ===============
var Post = require("./models/post"); // "./" is the reference of where we are
var User = require("./models/user");

// =============== CREATE ONE USER AND ONE POST (FIRST RUN) ===============
User.create({
	name: "Bob Belcher",
	email: "bob@gmail.com"
}, function(err, user) {
	if(err) {
		console.log(err);
	} else {
		console.log("CREATED BOB", user)
	}
});

Post.create({
	title: "How to cook the best burguer",
	content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}, function(err, post) {
	if(err) {
		console.log(err);
	} else {
		console.log("CREATED A POST", post);
	}
});

// =============== CREATE TWO POSTS AND REFERENCE THEM INSIDE BOB (SECOND RUN) ===============
Post.create({
	title: "How to cook the best burguer pt2",
	content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}, function(err, post) {
	if(err) {
		console.log(err);
	} else {
		User.findOne({email: "bob@gmail.com"}, function(err, user) {
			if(err) {
				console.log(err);
			} else {
				user.posts.push(post);
				user.save(function(err, data) {
					if(err) {
						console.log(err);
					} else {
						console.log("REFERENCED FIRST POST TO THE USER", data);
					}
				});
			}
		});
	}
});

Post.create({
	title: "How to cook the best burguer pt3",
	content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
}, function(err, post) {
	if(err) {
		console.log(err);
	} else {
		User.findOne({email: "bob@gmail.com"}, function(err, user) {
			if(err) {
				console.log(err);
			} else {
				user.posts.push(post);
				user.save(function(err, data) {
					if(err) {
						console.log(err);
					} else {
						console.log("REFERENCED SECOND POST TO THE USER", data);
					}
				});
			}
		});
	}
});

// =============== FIND BOB AND FIND THEIR POSTS (THIRD RUN) ===============
// ".populate" fill the "posts" field of Bob, after that, exec the query
User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {
	if(err) {
		console.log(err);
	} else {
		console.log(user);
	}
});

// =============== RETURN EVERYTHING IN THE DATABASE (LAST RUN) ===============
User.find({}, function(err, data) {
	if(err) {
		console.log(err);
	} else {
		console.log(data);
	}
});
Post.find({}, function(err, data) {
	if(err) {
		console.log(err);
	} else {
		console.log(data);
	}
});