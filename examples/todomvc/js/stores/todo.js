
module.exports = function *() {

	var store = {
		todos: []
	};

	function findTodoItem(id) {

		for (var index in store.todos) {
			var todo = store.todos[index];
			if (todo.id == id) {
				return index;
			}
		}

		return -1;
	}

	this.on('store.Todo.getTodos', function *(callback) {
		callback(null, store.todos);
	});

	this.on('store.Todo.create', function *(text) {
		store.todos.push({
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

		store.todos.splice(index, 1);

		this.dispatch('store.Todo', 'change');
	});

	this.on('store.Todo.updateText', function *(id, text) {
		text = text.trim();
		if (text === '')
			return;

		var index = findTodoItem(id);
		if (index == -1)
			return;

		store.todos[index].text = text;

		this.dispatch('store.Todo', 'change');
	});

	this.on('store.Todo.mark', function *(id) {

		var index = findTodoItem(id);
		if (index == -1)
			return;

		store.todos[index].complete = true;

		this.dispatch('store.Todo', 'change');
	});

	this.on('store.Todo.unmark', function *(id) {

		var index = findTodoItem(id);
		if (index == -1)
			return;

		store.todos[index].complete = false;

		this.dispatch('store.Todo', 'change');
	});

	this.on('store.Todo.destroyCompleted', function *() {

		var todos = [];
		for (var index in store.todos) {
			if (!store.todos[index].complete) {
				todos.push(store.todos[index]);
			}
		}

		store.todos = todos;

		this.dispatch('store.Todo', 'change');
	});

	this.on('store.Todo.markAll', function *() {

		var areAllMarked = true;
		for (var index in store.todos) {
			if (!store.todos[index].complete) {
				areAllMarked = false;
				break;
			}
		}

		for (var index in store.todos) {
			store.todos[index].complete = !areAllMarked;
		}

		this.dispatch('store.Todo', 'change');
	});
};
