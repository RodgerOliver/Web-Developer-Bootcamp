var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var msg = document.querySelector('#msg');
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#resetBtn");
var modeBtns = document.querySelectorAll(".mode");
var container = document.querySelector(".container");

init();

function init() {
	setupModeBtns();
	setupSquares();
	reset();
}

function setupModeBtns() {
	for (i=0; i<modeBtns.length; i++) {
		modeBtns[i].addEventListener("click", function() {
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			modeBtns[2].classList.remove("selected");
			modeBtns[3].classList.remove("selected");
			this.classList.add("selected");
			//this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			if(this.textContent === "Easy") {
				numSquares = 3;
			}
			else if(this.textContent === "Medium") {
				numSquares = 6;
			}
			else if(this.textContent === "Hard") {
				numSquares = 9;
			}
			else {
				numSquares = 15;
			}
			reset();
		})
	}
}

function setupSquares() {
	for(i=0; i<squares.length; i++) {
		// add click listeners to squares
		squares[i].addEventListener("click", function() {
			// grab color of the clicked square
			var clickedColor = this.style.backgroundColor;
			// compare color to pickedColor
			if(clickedColor === pickedColor) {
				msg.textContent = "Correct!";
				changeColor(pickedColor);
				h1.style.backgroundColor = clickedColor;
				resetBtn.textContent = "Play Again?"
			}
			else {
				this.style.backgroundColor = "#232323";
				msg.textContent = "Try Again!";
			}
		});
	}
}


resetBtn.addEventListener("click", function() {
	reset();
});


// Functions
function reset() {
	colors = pushColors(numSquares);
	// pick a random color from array
	pickedColor = pickColor();
	// change colorDisplay to match pickedColor
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "";
	msg.textContent = "";
	resetBtn.textContent = "New Colors";
	// change color of the squares
	for(i=0; i<squares.length; i++) {
		if(colors[i]){
			if (colors.length === 15) {
				container.style.maxWidth = "833.4px";
				squares[i].classList.add("squaresExtreme");
			}
			else {
				container.style.maxWidth = "500px";
				squares[i].classList.remove("squaresExtreme");
			}
			squares[i].style.display = "";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
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