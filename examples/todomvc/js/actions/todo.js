
module.exports = function *() {
	this.on('action.Todo.toggle', function *(todo) {
		if (todo.complete)
			this.dispatch('store.Todo.unmark', todo.id);
		else
			this.dispatch('store.Todo.mark', todo.id);
	});
};
