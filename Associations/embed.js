var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_emb", {useMongoClient: true});
mongoose.Promise = global.Promise;

// =============== SETUP SCHEMAS AND MODELS (ALWAYS) ===============
// POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

// USER - name, email
var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	posts: [postSchema] // associating the posts with users (embedding the posts)
},{
	usePushEach: true // set this to be able to push new posts
});

var User = mongoose.model("User", userSchema);

// =============== CREATE THE USERS AND ONE POST (FIRST RUN) ===============
// Create one user
var Charlie = new User({
	name: "Charlie Brown",
	email: "charlie@brown.edu"
});

Charlie.save(function(err, user) {
	if(err) {
		console.log(err);
	} else {
		console.log("CREATED CRALIE", user);
	}
});

// Create another user
var Hermione = new User({
	name: "Hermione Granger",
	email: "hermione@hogwarts.edu"
});

// Add a comment to Hermione
Hermione.posts.push({
	title: "How to bre polyjuice potion",
	content: "Just kidding, go to potions class to learn it!!"
});

Hermione.save(function(err, user) {
	if(err) {
		console.log(err);
	} else {
		console.log("CREATED HERMIONE", user);
	}
});

// Create a post
var newPost = new Post({
	title: "Reflections on Apples",
	content: "They are delicious!"
});

newPost.save(function(err, post) {
	if(err) {
		console.log(err);
	} else {
		console.log("CREATED A SINGLE POST", post);
	}
});

// =============== FIND ONE USER AND PUSH A POST TO THIS USER (SECOND RUN) ===============
// Find Hermione and push a post to her
User.findOne({name: "Hermione Granger"}, function(err, user) {
	if(err) {
		console.log(err);
	} else {
		user.posts.push({
			title: "3 thing I really hate",
			content: "Voldemort, Voldemort, Voldemort."
		});
		user.save(function(err, user) {
			if(err) {
				console.log(err);
			} else {
				console.log("ADDED ANOTHER POST TO HERMIONE", user);
			}
		});
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