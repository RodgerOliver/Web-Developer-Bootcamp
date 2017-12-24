var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useMongoClient: true});

// schema and model setup
var campSchema = new mongoose.Schema({
	name: String,
	image: String
});
var Camp = mongoose.model("Camp", campSchema);


app.get("/", function(req, res) {
	res.render("home");
});

app.get("/camps", function(req, res) {
	// get all the campgrounds
	Camp.find({}, function(err, camps) {
		if(err) {
			console.log(err);
		} else {
			res.render("camps", {camps: camps});
		}
	});

});

app.post("/camps", function(req, res) {
	var name = req.body.name;
	var url = req.body.url;
	var newCamp = {name: name, image: url};
	// create and add a new campground
	Camp.create(newCamp, function(err, newCamp) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/camps");	
		}
	});
});

app.get("/camps/new", function(req, res) {
	res.render("newCamp");
});

app.listen(3000, function() {
	console.log("Working on port 3000!");
});