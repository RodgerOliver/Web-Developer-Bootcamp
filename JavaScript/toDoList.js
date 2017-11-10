var input = prompt("What would you like to do?");
var todos = [];

while(input !== "quit" || input === false) {
	if(input === "list") {
		console.log(todos);
	}

	else if(input === "new") {
		var newTodo = prompt("Enter a new todo");
		todos.push(newTodo);
	}

	input = prompt("What would you like to do?");
}
alert("Thanks for using this Todo List!");