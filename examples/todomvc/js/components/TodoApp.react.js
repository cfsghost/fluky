var React = require('react');
var Fluky = require('Fluky');
var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');

class TodoApp extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			todos: []
		};
	}

	componentDidMount() {
		Fluky.on('store.Todo', Fluky.bindListener(this.onTodoChanged));
		Fluky.dispatch('store.Todo.getTodos', function(err, value) {
			this.setState({
				todos: value
			});
		}.bind(this))
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
		Fluky.dispatch('store.Todo.getTodos', function(err, value) {
			this.setState({
				todos: value
			});
		}.bind(this))
	}
};

module.exports = TodoApp;
