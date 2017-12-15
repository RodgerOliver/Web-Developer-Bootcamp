var express = require("express");
var app = express();


app.get("/", function(req, res) {
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
	var sounds = {
		pig: "Oinc",
		cow: "Moo",
		dog: "Woof Woof",
		cat: "Meow",
		fish: "..."
	}
	var animal = req.params.animal.toLowerCase();
	var sound = sounds[animal];
	res.send("The " + animal + " says '" + sound + "'");
});

app.get("/repeat/:word/:number", function(req, res) {
	var word = req.params.word;
	var num = Number(req.params.number);
	var string = "";

	for(var i=0; i<num; i++) {
		string += word + " "; 
	}
	res.send(string);
});


app.get("*", function(req, res) {
	res.send("Sorry, page not found... What are you doing with your life?");
});


app.listen(3000, function() {
	console.log("working on port 3000");
});