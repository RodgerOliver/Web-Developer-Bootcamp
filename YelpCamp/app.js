var	passportMongoose	= require("passport-local-mongoose"),
	Comment				= require("./models/comment"),
	LocalStrategy		= require("passport-local"),
	Camp				= require("./models/camp"),
	User				= require("./models/user"),
	bodyParser			= require("body-parser"),
	passport			= require("passport"),
	mongoose			= require("mongoose"),
	express				= require("express"),
	expressSession		= require("express-session"),
	seedDB				= require("./seeds"),
	app					= express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
seedDB();

// mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});

// express session setup
app.use(expressSession({
	secret: "Parkour",
	resave: false,
	saveUninitialized: false
}))

// passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// way to render this in each route
app.use(function(req, res, next) {
	res.locals.user = req.user; // "res.locals.USER" will be the name available in the template
	next();
});

// ===============
// ROUTES
// ===============
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
app.post("/camps", isLoggedIn, function(req, res) {
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
app.get("/camps/new", isLoggedIn, function(req, res) {
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
			res.render("camps/show", {camp: campById});
		}
	});
});

// NEW - show form to create a new comment
app.get("/camps/:id/comments/new", isLoggedIn, function(req, res) {
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
app.post("/camps/:id/comments", isLoggedIn, function(req, res) {
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

// AUTH Routes
app.get("/register", function(req, res) {
	res.render("register");
});

app.post("/register", function(req, res) {
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

app.get("/login", function(req, res) {
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/camps",
	failureRedirect: "/login"
}));

app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/camps");
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