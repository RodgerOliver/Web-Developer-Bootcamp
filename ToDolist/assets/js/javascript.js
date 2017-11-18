// Chech offspecific todo by clicking
$("li").click(function() {
	$(this).toggleClass("done");
})

// Click on X to delete todo
$("span").click(function (event) {
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
})

$("input").submit(function() {
	$("<li><span>X</span></li>").text = $("input").val();
})