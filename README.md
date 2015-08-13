# Fluky

Everything is asynchronous event!

A framework with flux data flow pattern and ECMAScript 6+. With Fluky, asynchronous event is a simple way to control all of frontend data flow. Inspired by Koa, Fluky dispatcher and event handlers were implemented by ES6 generator.

[![NPM](https://nodei.co/npm/fluky.png)](https://nodei.co/npm/fluky/)

## Installation

Install fluky via NPM:
```
npm install fluky
```

Note that fluky is using `require` and `EventEmitter` of Node.js, you must have browserify or webpack to make it work for front-end purpose.

## Usage

With Fluky, event-driven approach is the only way to handle __actions__ and __stores__, it makes everything easy and simple.

### Actions and Stores implementation

Here is sample code below to show how to implement __actions__ and __stores__ with Fluky and ES5/ES6+:
```js
import Fluky from 'fluky';
  
// ACTION
Fluky.on('action.Todo.toggle', function *(todo) {
  if (todo.completed)
    Fluky.dispatch('store.Todo.unmark', todo.id);
  else
    Fluky.dispatch('store.Todo.mark', todo.id);
});

// STORE
var todoStore = {
  todos: [];
};

Fluky.on('store.Todo.unmark', function *(id) {

  // Find specific todo item with id
  for (var index in todoStore.todos) {
    var todo = todoStore.todos[index];
    
    if (todo.id == id) {
      // Unmark
      todo.completed = false;
      
      // Fire event that store was changed
      Fluky.dispatch('store.Todo', 'change');
      break;
    }
  }
});

Fluky.on('store.Todo.mark', function *(id) {

  // Find specific todo item with id
  for (var index in todoStore.todos) {
    var todo = todoStore.todos[index];
    
    if (todo.id == id) {
      // Mark
      todo.completed = true;
      
      // Fire event that store was changed
      Fluky.dispatch('store.Todo', 'change');
      break;
    }
  }
});

Fluky.on('store.Todo.create', function *(text) {

  // Add a new todo item to store
  todoStore.todos.push({
    id: Date.now(),
    text: text,
    completed: false
  });
  
  // Fire event that store was changed
  Fluky.dispatch('store.Todo', 'change');
});

Fluky.on('store.Todo.getTodos', function *(callback) {
  callback(todoStore.todos);
});
```

If no action defined, message will be forwarded to store. For instance, `action.Todo.create` isn't defined but forwarding to `store.Todo.create` automatically.

### Access Actions and Stores with React.js

Call action and get data from store both works by using `Fluky.dispatch()` to fire event. 

```js
import React from 'react';
import Fluky from 'fluky';

// React component (view)
class TodoList extends React.Component {

  constructor() {
    // preparing state to initialize component
    this.state.todos: []
  }
  
  componentDidMount() {
    Fluky.on('store.Todo', Fluky.bindListener(this.onChange));
  }
  
  componentWillUnmount() {
    Fluky.off('store.Todo', this.onChange);
  }

  // Using "() =>" to bind "this" to method
  onChange = () => {

    // Fire event to get todo list
    Fluky.dispatch('store.Todo.getTodos', (todos) => {
  
      // Updating state
      this.setState({
        todos: todos;
      });
    }.bind(this));
  }

  create = () => {
    // Fire event to create a new todo item
    Fluky.dispatch('action.Todo.create', 'Dance');
  }
  
  render: function() {
    var todoList = [];
    
    this.state.todos.forEach((todo) => {
      todoList.push(<div>{todo.text}</div>);
    });
  
    // Template for React
    return (
      <div>
        {todoList}
        <button onClick={this.create}>Add Item</button>
      </div>
    );
  }
}
```

### Modular

You can create a Store without ever touching Action. Fluky provide a way to extend, using `Fluky.load()` to load Actions and Stores.

```js

import Fluky from 'fluky';

var todoStore = function *() {
  this.on('store.Todo.getTodos', function *() { ... });
  this.on('store.Todo', function *(callback) { ... });
};

Fluky.load(todoStore);
```

Loading multiple modules at one time is possible:
```js
var actions = [
  todoAction,
  userAction
];

var stores = [
  todoStore,
  userStore
];

Fluky.load(actions, stores);
```

### State Management

In order to make an isomorphic app, initial state should be rendered on the server stage. That's a big challenge because state provided by server usually conflicts with client-side store. Fluky supports state management that a way to solve multiple stores problem.

On the server-side, developer can use `setInitialState()` to create a initial state:
```js
setInitialState({
	Todo: {}
});
```

Then you can get state everywhere, modify it and add put stores in it. For example below:
```js
Fluky.state.Todo.timestamp = Date.now();
```

In module, it is possible to get `Fluky` with `this` keyword, then there is the same way to access state:
```js
var todoStore = function *() {
	this.state.Todo.timestamp = Date.now();
};

```

## Demo

Just like other front-end framework, fluky has an TodoMVC example for demostration as well.

Change working directory then initializing and starting it with NPM command:
```
cd examples/todomvc/
npm install
npm start
```

Now you can open `index.html` with browser immediately.

## Authors

Copyright(c) 2015 Fred Chien <<cfsghost@gmail.com>>

## License

Licensed under the MIT License
