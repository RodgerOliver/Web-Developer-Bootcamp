function isEven(num) {
	return num % 2 === 0;

	// if(num % 2 === 0){
	// 	return true;
	// }
	// else {
	// 	return false;
	// }
	
}

function factorial(numb) {

	var result = 1;
	for(i=2; i<=numb; i++) {
		result*=i;
	}
	return result;

	// var result = numb;
	// if(numb===0) {
	// 	return 1;
	// }

	// for(i=numb-1; i>=numb; i--) {
	// 	result*=i;
	// }
	// return result;
}

function kebabaToSnake(str) {
	var newStr = str.replace(/-/g, "_");
	return newStr;
}