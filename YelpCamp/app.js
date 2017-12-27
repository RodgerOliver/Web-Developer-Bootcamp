var bodyParser = require("body-parser"),
	mongoose 	= require("mongoose"),
	express 		= require("express"),
	app 			= express(),
	Camp 			= require("./models/camp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

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
			res.render("index", {camps: camps});
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
	res.render("new");
});

// SHOW - show more info about one camp
app.get("/camps/:id", function(req, res) {
	// find the camp with provide ID
	var id = req.params.id;
	Camp.findById(id, function(err, campById) {
		if(err) {
			console.log(err);
		} else {
			// show template with that camp
			res.render("show", {
				camp: campById
			});
		}
	})
})

app.listen(3000, function() {
	console.log("Working on port 3000!");
});