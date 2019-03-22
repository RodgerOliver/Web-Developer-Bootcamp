var input = prompt("What would you like to do?");
var todos = [];

while(input !== "quit" || input === false) {
	if(input === "list") {
		listTodo();
	}

	else if(input === "new") {
		addTodo();
	}

	else if(input === "delete") {
		deleteTodo();
	}

	input = prompt("What would you like to do?");
}
alert("Thanks for using this Todo List!");


function listTodo() {
	console.log("********************");
		todos.forEach(function(todo, index) {
			console.log(index + ": " + todo);
		})
		console.log("********************");
}

function addTodo() {
	var newTodo = prompt("Enter a new todo");
		console.log("Added todo");
		todos.push(newTodo);
}

function deleteTodo() {
	var index = prompt("Enter index of todo to delete");
		todos.splice(index, 1);
		console.log("Deleted todo");
}