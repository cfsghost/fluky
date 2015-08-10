var React = require('react');
var ReactPropTypes = React.PropTypes;
var Fluky = require('fluky');
var TodoItem = require('./TodoItem.react');

class MainSection extends React.Component {

	static propTypes = {
		todos: ReactPropTypes.array.isRequired
	};

	static defaultProps = {
		todos: []
	};

	markAll() {
		Fluky.dispatch('action.Todo.markAll');
	}

	render() {
		const todos = this.props.todos;

		if (todos.length < 1)
			return null;

		const markedCount = todos.reduce(
				(count, todo) => todo.complete ? count + 1 : count,
				0
		);
		const areAllCompleted = (markedCount == todos.length) ? true : false;

		const todoList = [];
		todos.forEach((todo) => {
			todoList.push(<TodoItem key={todo.id} todo={todo} />);
		});

		return (
			<section id="main">
				<input
					id="toggle-all"
					type="checkbox"
					onChange={this.markAll}
					checked={areAllCompleted ? 'checked' : ''} />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul id="todo-list">{todoList}</ul>
			</section>
		);
  }
};

module.exports = MainSection;
