var numb = prompt("Choose a number between 1 and 3");

if (numb == 1) {
	while(msg = prompt("Are we there yet?")) {
		if(msg === "yes" || msg === "yeah") {
			alert("Yay, we finally made it!");
			break;
		}
	}
}

else if(numb == 2) {
	var msg = prompt("Are we there yet?");

	while(msg !== "yes" && msg !== "yeah") {
		msg = prompt("Are we there yet?");
	}
	alert("Yay, we finally made it!");
}


else {
	var msg = prompt("Are we there yet?");

	while(msg.indexOf("yes") === -1 && msg.indexOf("yeah") === -1) {
		msg = prompt("Are we there yet?");
	}
	alert("Yay, we finally made it!");
}