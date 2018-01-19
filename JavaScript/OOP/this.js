// ========== DETERMINE THE VALUE OF THE KEYWORD THIS ==========

/* First Rule: Global Context */
	// when the keyword "this" is outside of a declared object
	// the value of it is the global object
console.log(this);

function returnThis() {
	return this;
}

// the func below would make a global var
// but the strict mode prevents that
"use strict"
function mistake() {
	this.badIdea = "Opps";
}

/* Second Rule: Implicit context */
	// when the keyword "this" is inside of a declared object
	// the value of it is the closest parent object
var person = {
	name: "Colt",
	sayHi: function() {
		return "Hi " + this.name; // "Hi Colt"
	},
	determineContext: function() {
		return this === person; // true
	},
	dog: {
		sayHello: function() {
			return "Hello " + this.name; // "Hello undefined"
			// "this" refers to "dog" that doesn't have a name property
		},
		determineContext: function() {
			return this === person; // false
		}
	}
}

/* Third Rule: Explicitly Binding */
	// to explicitly change the value of the keyword "this"
	// use the methods call, apply or bind (only in functions)
/* a,b,c are parameters of the function */
// call(thisArg, a, b, c) *sync
// apply(thisArg, [a, b, c]) *sync
// bind(thisArg, a, b, c) *async
// ======= solving the "undefined" issue with call
person.dog.sayHello.call(person); // "Hello Colt"
person.dog.determineContext.call(person); // true
// ====================
var colt = {
	name: "Colt",
	sayHi: function() {
		return "Hi " + this.name;
	},
	addNumbers: function(a, b, c, d) {
		return this.name + " just calculated " + (a+b+c+d);
	}
}

var elie = {
	name: "Elie",
	// sayHi: function() {
	// 	return "Hi " + this.name;
	// }
}

colt.sayHi.call(elie);
colt.addNumbers.call(elie, 1, 2, 3, 4);
colt.addNumbers.apply(elie, [1, 2, 3, 4]);
// bind returns a function definition
// that doesn't need all the params right a way
var elieCalc = colt.addNumbers.bind(elie, 1, 2, 3, 4);
elieCalc() // "Elie just calculated 10"
var elieCalc2 = colt.addNumbers.bind(elie, 1, 2,);
elieCalc2(3, 4) // "Elie just calculated 10"