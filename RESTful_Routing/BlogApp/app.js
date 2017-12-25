var bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	express 	= require("express"),
	app 		= express();

// App Config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// Mongoose Connect
mongoose.connect("mongodb://localhost:27017/blog_app", {useMongoClient: true});
mongoose.Promise = global.Promise;

// Mongoose Schema
var postSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

// Mongoose Model
var Post = mongoose.model("Post", postSchema);

// RESTful Routes
app.get("/", function(req, res) {
	res.redirect("/posts");
});

app.get("/posts", function(req, res) {
	Post.find({}, function(err, posts) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {posts: posts});
		}
	});
});

app.listen(3000, function() {
	console.log("Working on port 3000");
});