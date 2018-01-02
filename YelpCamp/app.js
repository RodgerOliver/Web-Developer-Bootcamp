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

// Requering Routes
var campsRoutes		= require("./routes/camps"),
	commentsRoutes	= require("./routes/comments"),
	indexRoutes		= require("./routes/index");

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

// Using Routes
app.use(indexRoutes);
app.use("/camps", campsRoutes); // prefix "/camps" is added in front of every route
app.use("/camps/:id/comments", commentsRoutes);

app.listen(3000, function() {
	console.log("Working on port 3000!");
});