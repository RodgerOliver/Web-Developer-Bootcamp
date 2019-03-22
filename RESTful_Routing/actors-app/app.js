var	methodOverride = require("method-override"),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	express 	= require("express"),
	app 		= express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost:27017/actors-app", {useMongoClient: true});
mongoose.Promise = global.Promise;

var actorSchema = new mongoose.Schema({
	name: String,
	age: Number,
	description: String,
	image: String,
	films: String
});

var Actor = mongoose.model("Actor", actorSchema);


app.get("/", function(req, res) {
	res.redirect("/actors");
});

// INDEX ROUTE
app.get("/actors", function(req, res) {
	Actor.find({}, function(err, actors) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {actors: actors});
		}
	});
});

// NEW ROUTE
app.get("/actors/new", function (req, res) {
	res.render("new");
});

// CREATE ROUTE
app.post("/actors", function (req, res) {
	var newActor = req.body.actor;
	Actor.create(newActor, function(err, newActor) {
		if(err) {
			res.redirect("/actors");
		} else {
			res.redirect("/actors");
		}
	});
});

// SHOW ROUTE
app.get("/actors/:id", function (req, res) {
	var id = req.params.id;
	Actor.findById(id, function(err, actor) {
		if(err) {
			res.redirect("/actors");
		} else {
			res.render("show", {actor: actor});
		}
	});
});

// EDIT ROUTE
app.get("/actors/:id/edit", function (req, res) {
	var id = req.params.id;
	Actor.findById(id, function(err, actor) {
		if(err) {
			res.redirect("/actors/" + id);
		} else {
			res.render("edit", {actor: actor});
		}
	});
});

// UPDATE ROUTE
app.put("/actors/:id", function (req, res) {
	var id = req.params.id;
	var updatedActor = req.body.actor;
	Actor.findByIdAndUpdate(id, updatedActor, function(err, actor) {
		if(err) {
			res.redirect("/actors/");
		} else {
			res.redirect("/actors/" + id);
		}
	});
});

// UPDATE ROUTE
app.delete("/actors/:id", function (req, res) {
	var id = req.params.id;
	Actor.findByIdAndRemove(id, function(err) {
		if(err) {
			res.redirect("/actors/" + id);
		} else {
			res.redirect("/actors/");
		}
	});
});

// search route
app.get("/search", function(req, res) {
	var actorName = req.query.actorName;
	if(actorName === "") {
		res.redirect("/actors");
	} else {
		var regex = new RegExp(actorName, "i");
		Actor.find({name: regex}, function(err, actor) {
			if(err) {
				res.redirect("index");
			} else {
				res.render("index", {actors: actor});
			}
		});
	}
});

app.listen(3000, function() {
	console.log("Working on port 3000");
});