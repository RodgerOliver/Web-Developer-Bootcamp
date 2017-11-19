// Chech offspecific todo by clicking
// Create a listener for an element that exists when the page loads
// When an "li" is clicked inside of "ul" run the code bellow
$("ul").on("click", "li", function() {
	$(this).toggleClass("done");
})

// Click on X to delete todo
$("ul").on("click", "li span", function (event) {
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
})

$("input[type='text']").keypress(function(event) {
	if(event.which === 13) {
		var newTodo = $("<li><span><i class='fa fa-trash-o' aria-hidden='true'></i></span> "+ $(this).val() +"</li>")
		$("ul").append(newTodo);
		$(this).val("");
	}
})

$(".fa-plus").click(function() {
	$("input[type='text']").fadeToggle();
})
