var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// connecting to the server and creating a DB with the name after the "/"
mongoose.connect("mongodb://localhost:27017/cat-app", {useMongoClient: true});

// making a schema of how the cats look like
var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

// making a model(has mongo methods) and creating a collection with the plural name of the string above
var Cat = mongoose.model("Cat", catSchema);

// creating a new cat
Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Bland"
}, function(err, cat) {
	if(err) {
		console.log(err);
	} else {
		console.log("New cat: ", cat);
	}
});


// retriving all cats from DB "cat-app" collection "cats" using the model "Cat"
setTimeout(function() {
	Cat.find({}, function(err, cats) {
		if(err) {
			console.log(err);
		} else {
			console.log("All cats: ", cats);
		}
	});
}, 1000);

/*
ANOTHER WAY OF SAVING CATS
// making a new cat
var norris = new Cat({
	name: "Mrs. Norris",
	age: 7,
	temperament: "Evil"
});

// saving the new cat to the database "cat-app", collection "cats"
norris.save(function(err, cat) {
	if(err) {
		console.log(err);
	} else {
		console.log("Save a cat to the database:", cat);
	}
});
*/