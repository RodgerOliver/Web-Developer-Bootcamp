var p1 = document.querySelector("#p1");
var p2 = document.querySelector("#p2");
var p1Score = 0;
var p2Score = 0;
var reset = document.querySelector("#reset");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var input = document.querySelector("input");
var winScrDisplay = document.querySelector("#winScrDisplay");
var winningScore = 5;
input.value = winningScore;
var gameOver = false;

p1.addEventListener("click", function() {

	if (!gameOver) {
		p1Score++;
		if (p1Score === winningScore) {
			gameOver = true;
			p1Display.classList.add('winner');
		}
		p1Display.textContent = p1Score;
	}
})

p2.addEventListener("click", function() {
	if (!gameOver) {
		p2Score++;
		if (p2Score === winningScore) {
			gameOver = true;
			p2Display.classList.add('winner');
		}
		p2Display.textContent = p2Score;
	}
})

reset.addEventListener("click", function() {
	p1Score = 0;
	p2Score = 0;
	p1Display.textContent = p1Score;
	p2Display.textContent = p2Score;
	p1Display.classList.remove('winner');
	p2Display.classList.remove('winner');
	input.readOnly = false;
	input.value = winScrDisplay.textContent;
	gameOver = false;
})

input.addEventListener("change", function() {

	if(p1Score !== 0 || p1Score !== 0) {
		this.readOnly = true;
	}
	else {
		winScrDisplay.textContent = this.value;
		winningScore = Number(this.value);
	}
})