var React = require('react');
var ReactPropTypes = React.PropTypes;
var Fluky = require('fluky');

class Footer extends React.Component {

	static propTypes = {
		todos: ReactPropTypes.array.isRequired
	};

	static defaultProps = {
		todos: []
	};

	render() {
		const todos = this.props.todos;
		const total = todos.length;

		if (total === 0)
			return null;

		const markedCount = todos.reduce(
				(count, todo) => todo.complete ? count + 1 : count,
				0
		);

		const itemsLeft = total - markedCount;

		let itemsLeftPhrase = (itemsLeft === 1) ? ' item ' : ' items ';
		itemsLeftPhrase += 'left';

		let clearCompletedButton;
		if (!itemsLeft) {
			clearCompletedButton =
				<button
					id="clear-completed"
					onClick={this.onClearCompletedClick}>
					Clear completed ({markedCount})
				</button>;
		}

		return (
			<footer id="footer">
				<span id="todo-count">
					<strong>{itemsLeft}</strong>
					{itemsLeftPhrase}
				</span>
				{clearCompletedButton}
			</footer>
		);
	}

	onClearCompletedClick = () => {
		Fluky.dispatch('action.Todo.destroyCompleted');
	}

}

module.exports = Footer;
