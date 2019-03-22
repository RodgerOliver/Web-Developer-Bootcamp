$("#calcBtn").click(function() {
	$("#resultado").text("Resultado: ");
	if($("#t2").css("display") === "table") {
		var arr2 = mkArr2();
		var result = det(arr2);
		$("#resultado").append(result);
	}
	else if($("#t3").css("display") === "table") {
		var arr3 = mkArr3();
		var result = det(arr3);
		$("#resultado").append(result);
	}
	else {
		var arr4 = mkArr4();
		var result = det(arr4);
		$("#resultado").append(result);
	}
	$("#resultado").css("font-weight", "bold");
})


$("#d2").click(function() {
	reset();
	if($("#t2").css("display") !== "table") {
		$("table").css("display", "none");
		$("#t2").css("display", "table");
	} else {
		$("#t2").css("display", "none");
	}
})


$("#d3").click(function() {
	reset();
	if($("#t3").css("display") !== "table") {
		$("table").css("display", "none");
		$("#t3").css("display", "table");
	} else {
		$("#t3").css("display", "none");
	}
})


$("#d4").click(function() {
	reset();
	if($("#t4").css("display") !== "table") {
		$("table").css("display", "none");
		$("#t4").css("display", "table");
	} else {
		$("#t4").css("display", "none");
	}
})


function reset() {
	$("input").val("");
	$("#resultado").text("Resultado: ");
	$("#resultado").css("font-weight", "normal");
}

function mkArr2() {

	var arr1 = [];
	for(i=0; i<$("table#t2 input").length; i++){
		arr1.push(Number($("table#t2 input").eq(i).val()));
	}

	var size = Math.sqrt(arr1.length);
	var arr2 = arr1.splice(size, size);
	var bigArr = [arr1,arr2];
	return (bigArr);
}

function mkArr3() {

	var arr1 = [];
	for(i=0; i<$("table#t3 input").length; i++){
		arr1.push(Number($("table#t3 input").eq(i).val()));
	}

	var size = Math.sqrt(arr1.length);
	var arr2 = arr1.splice(size, size);
	var arr3 = arr1.splice(size, size);
	var bigArr = [arr1,arr2,arr3];
	return (bigArr);
}

function mkArr4() {

	var arr1 = [];
	for(i=0; i<$("table#t4 input").length; i++){
		arr1.push(Number($("table#t4 input").eq(i).val()));
	}

	var size = Math.sqrt(arr1.length);
	var arr2 = arr1.splice(size, size);
	var arr3 = arr1.splice(size, size);
    var arr4 = arr1.splice(size, size);
	var bigArr = [arr1,arr2,arr3,arr4];
	return (bigArr);
}

function det(arr) {

	if(arr.length === 2) {
		return (arr[0][0]*arr[1][1] - arr[0][1]*arr[1][0])
	}

	var result = 0;
	for(var i=0; i<arr.length; i++) {
		result += Math.pow(-1, i)*arr[0][i]*det(delRow_Col(arr, i));
	}
	return (result);
}

function delRow_Col(arr, index) {
	var temp = [];
	// copy the original array
	for(var i=0; i<arr.length; i++) {
		temp.push(arr[i].slice(0));
	}
	// delete the first row
	temp.splice(0,1);
	// delete the colomun at the index
	for(var i=0; i<temp.length; i++) {
		temp[i].splice(index, 1);
	}
	return (temp);
}