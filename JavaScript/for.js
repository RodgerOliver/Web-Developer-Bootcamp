console.log("NUMBERS BETWEEN -10 AND 19");
for(i=-10; i<=19; i++) {
	console.log(i);
}

console.log("EVEN NUMBERS BETWEEN 10 AND 40");
for(i=10; i<=40; i++) {
	if(i % 2 === 0) {
		console.log(i);
	}
}

console.log("ODD NUMBERS BETWEEN 300 AND 333");
for(i=300; i<=333; i++) {
	if(i % 2 !== 0) {
		console.log(i);
	}
}

console.log("NUMBERS DIVISIBLE BY 3 AND 5 BETWEEN 5 AND 50");
for(i=5; i<=50; i++) {
	if(i % 3 == 0 && i % 5 == 0) {
		console.log(i);
	}
}