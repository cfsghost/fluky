var React = require('react');
var TodoApp = require('./components/TodoApp.react');
var Fluky = require('fluky');
var Actions = require('./actions');
var Stores = require('./stores');

Fluky.load(Actions, Stores);

React.render(
	<TodoApp />,
	document.getElementById('todoapp')
);
