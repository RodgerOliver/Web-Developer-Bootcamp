// constructor function
function Car(make, model, year) {
	// instance properties
	this.make = make;
	this.model = model;
	this.year = year;
	this.numWheels = 4;
	this.isRunning = false;
	// instance method inside(unusual)
	this.add = function() {
		Car.collection.push(this);
		return "Added to the car collection!";
	}
}
// class property
Car.collection = [];
// class method
Car.show = function() {
	for(var i = 0; i < Car.collection.length; i++) {
		console.log("Name: " + Car.collection[i].model);
		console.log("Make: " + Car.collection[i].make);
		console.log("Year: " + Car.collection[i].year);
		console.log("===================================");
	}
}

// prototype chain(instance methods/properties outside of the constructor)
// correct way to write instance methods
Car.prototype.turnOn = function() {
	this.isRunning = true;
	return "Car turned on."
}

Car.prototype.turnOff = function() {
	this.isRunning = false;
	return "Car turned off."
}

Car.prototype.honk = function() {
	if(this.isRunning) {
		return "BEEP!!!";
	} else {
		return "...";
	}
}

// instantiating new objects
var onix = new Car("Chevrolet", "Onix", 2017);
var focus = new Car("Ford", "Focus", 2016);
var monza = new Car("Chevrolet", "Monza", 1999);
var palio = new Car("Fiat", "Palio", 2009);
// add instances
onix.add();
focus.add();
monza.add();
palio.add();

// ====================================================

function Motorcycle(make, model, year) {
	// using other constructor to make a "child"
	Car.apply(this, arguments);
	this.numWheels = 2;
	// polymorphism
	// modifying the original method
	this.add = function() {
		Motorcycle.collection.push(this);
		return "Added to the motorcycle collection!";
	}
}

Motorcycle.collection = [];
Motorcycle.show = function() {
	for(var i = 0; i < Motorcycle.collection.length; i++) {
		console.log("Name: " + Motorcycle.collection[i].model);
		console.log("Make: " + Motorcycle.collection[i].make);
		console.log("Year: " + Motorcycle.collection[i].year);
		console.log("===================================");
	}
}

// prototypal inheritance
Motorcycle.prototype = Object.create(Car.prototype);
Motorcycle.prototype.constructor = Motorcycle;

var shadow = new Motorcycle("Honda", "Shadow", 2015);