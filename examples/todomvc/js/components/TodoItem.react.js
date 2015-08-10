var Fluky = require('fluky');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoTextInput = require('./TodoTextInput.react');

var cx = require('react/lib/cx');

class TodoItem extends React.Component {

	static propTypes = {
		todo: ReactPropTypes.object.isRequired
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			isEditing: false
		}
	}

	save = (text) => {
		Fluky.dispatch('action.Todo.updateText', this.props.todo.id, text);
		this.setState({ isEditing: false });
	}

	toggle = () => {
		Fluky.dispatch('action.Todo.toggle', this.props.todo);
	}

	render() {
		var input;

		if (this.state.isEditing) {
			input =
				<TodoTextInput
					className="edit"
					onSave={this.save}
					value={this.props.todo.text} />;
		}

		const classNames = cx({
			'completed': this.props.todo.complete,
			'editing': this.state.isEditing
		});

		return (
			<li
				className={classNames}
				key={this.props.todo.id}>

				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={this.props.todo.complete}
						onChange={this.toggle} />
					<label onDoubleClick={this.onDoubleClick}>{this.props.todo.text}</label>
					<button className="destroy" onClick={this.onDestroyClick} />
				</div>
				{input}
			</li>
		);
	}

	onDoubleClick = () => {
		this.setState({ isEditing: true });
	}

	onDestroyClick = () => {
		Fluky.dispatch('action.Todo.destroy', this.props.todo.id);
	}

}

module.exports = TodoItem;
