var in21 = document.querySelector("#in21");
var in22 = document.querySelector("#in22");
var in23 = document.querySelector("#in23");

var in31 = document.querySelector("#in31");
var in32 = document.querySelector("#in32");
var in33 = document.querySelector("#in33");
var in34 = document.querySelector("#in34");
var in35 = document.querySelector("#in35");
var in36 = document.querySelector("#in36");
var in37 = document.querySelector("#in37");
var in38 = document.querySelector("#in38");
var in39 = document.querySelector("#in39");

var in41 = document.querySelector("#in41");
var in42 = document.querySelector("#in42");
var in43 = document.querySelector("#in43");
var in44 = document.querySelector("#in44");
var in45 = document.querySelector("#in45");
var in46 = document.querySelector("#in46");
var in47 = document.querySelector("#in47");
var in48 = document.querySelector("#in48");
var in49 = document.querySelector("#in49");
var in410 = document.querySelector("#in410");
var in411 = document.querySelector("#in411");
var in412 = document.querySelector("#in412");
var in413 = document.querySelector("#in413");
var in414 = document.querySelector("#in414");
var in415 = document.querySelector("#in415");
var in416 = document.querySelector("#in416");


$("#calcBtn").click(function() {
	if($("#t2").css("display") === "table") {
		$("#resultado").text("Resultado: ");
		var result = (in21.value*in24.value) - (in22.value*in23.value);
		$("#resultado").append(result);
	}
	else if($("#t3").css("display") === "table") {
		var result = ((in31.value*in35.value*in39.value) + (in32.value*in36.value*in37.value) + (in33.value*in34.value*in38.value)) - ((in32.value*in34.value*in39.value) + (in31.value*in36.value*in38.value) + (in35.value*in33.value*in37.value));
		$("#resultado").append(result);
	}
	$("#resultado").css("font-weight", "bold");
})


$("#d2").click(function() {
	reset()
	if($("#t2").css("display") !== "table") {
		$("table").css("display", "none");
		$("#t2").css("display", "table");
	} else {
		$("#t2").css("display", "none");
	}
})


$("#d3").click(function() {
	reset()
	if($("#t3").css("display") !== "table") {
		$("table").css("display", "none");
		$("#t3").css("display", "table");
	} else {
		$("#t3").css("display", "none");
	}
})


$("#d4").click(function() {
	reset()
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