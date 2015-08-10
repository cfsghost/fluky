var React = require('react');
var Fluky = require('fluky');
var TodoTextInput = require('./TodoTextInput.react');

class Header extends React.Component {

	render() {
		return (
			<header id="header">
				<h1>todos</h1>
				<TodoTextInput
					id="new-todo"
					placeholder="What needs to be done?"
					onSave={this.save}
				/>
			</header>
		);
	}

	save(text) {
		if (!text.trim())
			return;

		Fluky.dispatch('action.Todo.create', text);
	}

};

module.exports = Header;
