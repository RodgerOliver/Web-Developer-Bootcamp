function printReverse(arr) {
	for(i = arr.length - 1; i>=0; i--) {
		return arr[i];
	}
}

function isUniform(arr) {
	var f = arr[0];
	for(i=1; i<arr.length; i++) {
		if(f !== arr[i]) {
			return false;
		}
	}
	return true;
}

function sumArray(arr) {
	var sum = 0;
	for(i=0; i<arr.length; i++) {
		sum += arr[i];
	}
	return sum;
}

function max(arr) {
	var max = 0;
	for(i=0; i<arr.length; i++) {
		if(arr[i] > max) {
			max = arr[i];
		}
	}
	return max;
}