
module.exports = function *() {

	// Getting current state. Initialize state if state doesn't exist.
	var todoStore = this.getState('Todo', {
		todos: []
	});

	function findTodoItem(id) {

		for (var index in todoStore.todos) {
			var todo = todoStore.todos[index];
			if (todo.id == id) {
				return index;
			}
		}

		return -1;
	}

	this.on('store.Todo.create', function *(text) {
		todoStore.todos.push({
			id: Date.now(),
			complete: false,
			text: text
		});

		this.dispatch('store.Todo', 'change');
	});

	this.on('store.Todo.destroy', function *(id) {

		var index = findTodoItem(id);
		if (index == -1)
			return;

		todoStore.todos.splice(index, 1);

		this.dispatch('store.Todo', 'change');
	});

	this.on('store.Todo.updateText', function *(id, text) {
		text = text.trim();
		if (text === '')
			return;

		var index = findTodoItem(id);
		if (index == -1)
			return;

		todoStore.todos[index].text = text;

		this.dispatch('store.Todo', 'change');
	});

	this.on('store.Todo.mark', function *(id) {

		var index = findTodoItem(id);
		if (index == -1)
			return;

		todoStore.todos[index].complete = true;

		this.dispatch('store.Todo', 'change');
	});

	this.on('store.Todo.unmark', function *(id) {

		var index = findTodoItem(id);
		if (index == -1)
			return;

		todoStore.todos[index].complete = false;

		this.dispatch('store.Todo', 'change');
	});

	this.on('store.Todo.destroyCompleted', function *() {

		var todos = [];
		for (var index in todoStore.todos) {
			if (!todoStore.todos[index].complete) {
				todos.push(todoStore.todos[index]);
			}
		}

		todoStore.todos = todos;

		this.dispatch('store.Todo', 'change');
	});

	this.on('store.Todo.markAll', function *() {

		var areAllMarked = true;
		for (var index in todoStore.todos) {
			if (!todoStore.todos[index].complete) {
				areAllMarked = false;
				break;
			}
		}

		for (var index in todoStore.todos) {
			todoStore.todos[index].complete = !areAllMarked;
		}

		this.dispatch('store.Todo', 'change');
	});
};
