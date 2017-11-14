var colors = pushColors(6);
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var pickedColor = pickColor();
var msg = document.querySelector('#msg');
var h1 = document.querySelector("h1");

colorDisplay.textContent = pickedColor;

for(i=0; i<squares.length; i++) {
	squares[i].style.backgroundColor = colors[i];

	squares[i].addEventListener("click", function() {
		var clickedColor = this.style.backgroundColor;
		if(clickedColor === pickedColor) {
			msg.textContent = "Correct!";
			changeColor(pickedColor);
			h1.style.backgroundColor = clickedColor;
		}
		else {
			this.style.backgroundColor = "#232323";
			msg.textContent = "Try Again!";
		}
	})
}

function changeColor(color) {
	for(i=0; i<squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function pushColors(num) {
	var arr = [];
	for(i=0; i<num; i++) {
		arr.push(generateColors());
	}
	return arr;
}

function generateColors() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var rgb = "rgb(" + r + ", " + b + ", " + g + ")";
	return rgb;
}