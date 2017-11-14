var numSquares = 6;
var colors = pushColors(numSquares);
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var pickedColor = pickColor();
var msg = document.querySelector('#msg');
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");

colorDisplay.textContent = pickedColor;

reset.addEventListener("click", function() {
	colors = pushColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "";
	msg.textContent = "";
	reset.textContent = "New Colors";
	for(i=0; i<squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
});

easy.addEventListener("click", function() {
	easy.classList.add("selected");
	hard.classList.remove("selected");
	numSquares = 3;
	colors = pushColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "";
	msg.textContent = "";
	reset.textContent = "New Colors";
	for(i=0; i<squares.length; i++) {
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
});

hard.addEventListener("click", function() {
	easy.classList.remove("selected");
	hard.classList.add("selected");
	numSquares = 6;
	colors = pushColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "";
	msg.textContent = "";
	reset.textContent = "New Colors";
	for(i=0; i<squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "";
	}
});

for(i=0; i<squares.length; i++) {
	squares[i].style.backgroundColor = colors[i];

	squares[i].addEventListener("click", function() {
		var clickedColor = this.style.backgroundColor;
		if(clickedColor === pickedColor) {
			msg.textContent = "Correct!";
			changeColor(pickedColor);
			h1.style.backgroundColor = clickedColor;
			reset.textContent = "Play Again"
		}
		else {
			this.style.backgroundColor = "#232323";
			msg.textContent = "Try Again!";
		}
	});
}


// Functions
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