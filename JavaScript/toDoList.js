var input = prompt("What would you like to do?");
var todos = [];

while(input !== "quit" || input === false) {
	if(input === "list") {
		console.log("********************");
		todos.forEach(function(todo, index) {
			console.log(index + ": " + todo);
		})
		console.log("********************");
	}

	else if(input === "new") {
		var newTodo = prompt("Enter a new todo");
		console.log("Added todo");
		todos.push(newTodo);
	}

	else if(input === "delete") {
		var index = prompt("Enter index of todo to delete");
		todos.splice(index, 1);
		console.log("Deleted todo");
	}

	input = prompt("What would you like to do?");
}
alert("Thanks for using this Todo List!");