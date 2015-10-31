var React = require('react');
var Fluky = require('fluky');
var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');

class TodoApp extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			todos: Fluky.getState('Todo').todos
		};
	}

	componentDidMount() {
		Fluky.on('state.Todo', Fluky.bindListener(this.onTodoChanged));
	}

	componentWillUnmount() {
		Fluky.off('store.Todo', this.onTodoChanged);
	}

	render() {
		return (
			<div>
				<Header />
				<MainSection todos={this.state.todos} />
				<Footer todos={this.state.todos} />
			</div>
		);
	}

	onTodoChanged = () => {

		this.setState({
			todos: Fluky.getState('Todo').todos
		});
	}
};

module.exports = TodoApp;
