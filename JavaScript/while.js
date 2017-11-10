var a = -10;
console.log("NUMBERS BETWEEN -10 AND 19");
while(a <= 19) {
	console.log(a);
	a++;
}

var b = 10;
console.log("EVEN NUMBERS BETWEEN 10 AND 40");
while(b <= 40) {
	console.log(b);
	b+=2;
}

var c = 300;
console.log("ODD NUMBERS BETWEEN 300 AND 333");
while(c <= 333) {
	if(c % 2 !== 0) {
		console.log(c);
	}
	c+=1;
}

var d = 5;
console.log("NUMBERS DIVISIBLE BY 3 AND 5 BETWEEN 5 AND 50");
while(d <= 50) {
	if(d % 3 === 0 && d % 5 === 0)  {
		console.log(d);
	}
	d+=1;
}