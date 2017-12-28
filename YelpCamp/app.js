var bodyParser = require("body-parser"),
	mongoose 	= require("mongoose"),
	express 		= require("express"),
	app 			= express(),
	Camp 			= require("./models/camp"),
	Comment 			= require("./models/comment"),
	seedDB 		= require("./seeds");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
seedDB();

// mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});


app.get("/", function(req, res) {
	res.render("home");
});

// INDEX - show all camps
app.get("/camps", function(req, res) {
	// get all the campgrounds
	Camp.find({}, function(err, camps) {
		if(err) {
			console.log(err);
		} else {
			res.render("camps/index", {camps: camps});
		}
	});
});

// CREATE - add new camp to DB
app.post("/camps", function(req, res) {
	var name = req.body.name;
	var url = req.body.url;
	var description = req.body.description;
	var newCamp = {name: name, image: url, description: description};
	// create and add a new campground
	Camp.create(newCamp, function(err, newCamp) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/camps");
		}
	});
});

// NEW - show form to create a new camp
app.get("/camps/new", function(req, res) {
	res.render("camps/new");
});

// SHOW - show more info about one camp
app.get("/camps/:id", function(req, res) {
	// find the camp with provided ID
	var id = req.params.id;
	// fill the 'comment' field of the camp
	Camp.findById(id).populate("comments").exec(function(err, campById) {
		if(err) {
			console.log(err);
		} else {
			// show template with that camp
			res.render("camps/show", {
				camp: campById
			});
		}
	});
});

// NEW - show form to create a new comment
app.get("/camps/:id/comments/new", function(req, res) {
	var id = req.params.id;
	Camp.findById(id, function(err, camp) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {camp: camp});
		}
	});
});

// CREATE - add new comment to DB
app.post("/camps/:id/comments", function(req, res) {
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
					})
				}
			});
		}
	});
});

app.listen(3000, function() {
	console.log("Working on port 3000!");
});