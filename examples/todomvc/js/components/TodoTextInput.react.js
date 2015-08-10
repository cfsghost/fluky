var Fluky = require('fluky');
var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

class TodoTextInput extends React.Component {

	static propTypes = {
		className: ReactPropTypes.string,
		id: ReactPropTypes.string,
		placeholder: ReactPropTypes.string,
		onSave: ReactPropTypes.func.isRequired,
		value: ReactPropTypes.string
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			value: props.value || ''
		};
	}

	render() {
		return (
			<input
				className={this.props.className}
				id={this.props.id}
				placeholder={this.props.placeholder}
				onBlur={this.save}
				onChange={this.onChange}
				onKeyDown={this.onKeyDown}
				value={this.state.value}
				autoFocus={true} />
		);
	}

	save = () => {
		this.props.onSave(this.state.value);
		this.setState({
			value: ''
		});
	}

	onChange = (event) => {
		this.setState({
			value: event.target.value
		});
	}

	onKeyDown = (event) => {
		if (event.keyCode === ENTER_KEY_CODE) {
			this.save();
		}
	}

};

module.exports = TodoTextInput;
