'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _fevent = require('./fevent');

var _fevent2 = _interopRequireDefault(_fevent);

function next() {
	return function (done) {
		done(null, true);
	};
}

var Core = (function (_Dispatcher) {
	_inherits(Core, _Dispatcher);

	function Core() {
		_classCallCheck(this, Core);

		_get(Object.getPrototypeOf(Core.prototype), 'constructor', this).call(this);

		this.disabledEventHandler = false;
		this.middlewares = [];
		this.handlers = [];
		this.wrapperMap = [];
		this._state = {};

		// Action
		this.use(_regeneratorRuntime.mark(function callee$2$0(event, next) {
			var args, e;
			return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						if (!(event.type != 'action')) {
							context$3$0.next = 4;
							break;
						}

						context$3$0.next = 3;
						return next();

					case 3:
						return context$3$0.abrupt('return', context$3$0.sent);

					case 4:
						if (!this.hasListeners(event.path)) {
							context$3$0.next = 8;
							break;
						}

						context$3$0.next = 7;
						return this.emit.apply(this, event.args);

					case 7:
						return context$3$0.abrupt('return');

					case 8:
						args = event.args.slice(0);

						args[0] = 'store.' + event.category + '.' + event.name;
						e = new _fevent2['default'](args[0], args);

						this.internalDispatch(e);

					case 12:
					case 'end':
						return context$3$0.stop();
				}
			}, callee$2$0, this);
		}));

		// Dispatch events
		this.use(_regeneratorRuntime.mark(function callee$2$0(event, next) {
			return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						context$3$0.next = 2;
						return this.emit.apply(this, event.args);

					case 2:
					case 'end':
						return context$3$0.stop();
				}
			}, callee$2$0, this);
		}));
	}

	_createClass(Core, [{
		key: 'use',
		value: function use() {
			this.middlewares.push(arguments[0].bind(this));
		}
	}, {
		key: 'loadHandler',
		value: function loadHandler(handler) {

			var exists = false;
			for (var index in this.handlers) {
				if (this.handlers[index] == handler) {
					exists = true;
					break;
				}
			}

			if (!exists) {
				(0, _co2['default'])(handler.bind(this));
				this.handlers.push(handler);
			}
		}
	}, {
		key: 'load',
		value: function load() {

			for (var k in arguments) {
				var handler = arguments[k];

				// It's an array
				if (!(handler instanceof Function)) {
					var handlers = handler;

					for (var key in handlers) {
						this.loadHandler(handlers[key]);
					}
				}
			}
		}
	}, {
		key: 'dispatch',
		value: function dispatch(eventStr) {

			// For isomorphic app, sometimes no need to handle event on server-side
			if (this.disabledEventHandler) return;

			var event = new _fevent2['default'](eventStr, arguments);

			this.internalDispatch(event);
		}
	}, {
		key: 'internalDispatch',
		value: function internalDispatch(event) {

			// Using all middlewares to handle this event
			(0, _co2['default'])(_regeneratorRuntime.mark(function callee$2$0() {
				var index, handler, isAlive;
				return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
					while (1) switch (context$3$0.prev = context$3$0.next) {
						case 0:
							context$3$0.t0 = _regeneratorRuntime.keys(this.middlewares);

						case 1:
							if ((context$3$0.t1 = context$3$0.t0()).done) {
								context$3$0.next = 17;
								break;
							}

							index = context$3$0.t1.value;
							handler = this.middlewares[index];
							context$3$0.prev = 4;
							return context$3$0.delegateYield(handler(event, next), 't2', 6);

						case 6:
							isAlive = context$3$0.t2;
							context$3$0.next = 13;
							break;

						case 9:
							context$3$0.prev = 9;
							context$3$0.t3 = context$3$0['catch'](4);

							console.log(context$3$0.t3);
							return context$3$0.abrupt('break', 17);

						case 13:
							if (isAlive) {
								context$3$0.next = 15;
								break;
							}

							return context$3$0.abrupt('break', 17);

						case 15:
							context$3$0.next = 1;
							break;

						case 17:
						case 'end':
							return context$3$0.stop();
					}
				}, callee$2$0, this, [[4, 9]]);
			}).bind(this));
		}
	}, {
		key: 'off',
		value: function off(eventName, listener) {
			// Find listener and remove its generator
			for (var index in this.wrapperMap) {
				var wrapper = this.wrapperMap[index];
				if (wrapper.listener == listener) {
					this.wrapperMap.splice(index, 1);
					_get(Object.getPrototypeOf(Core.prototype), 'off', this).call(this, eventName, wrapper.generator);
					return;
				}
			}

			_get(Object.getPrototypeOf(Core.prototype), 'off', this).call(this, eventName, listener);
		}
	}, {
		key: 'bindListener',
		value: function bindListener(listener) {

			// Don't wrap again if it exists
			for (var index in this.wrapperMap) {
				var wrapper = this.wrapperMap[index];
				if (wrapper.listener == listener) return wrapper.generator;
			}

			// add to list
			var wrapper = {
				listener: listener,
				generator: _regeneratorRuntime.mark(function generator() {
					var args$3$0 = arguments;
					return _regeneratorRuntime.wrap(function generator$(context$3$0) {
						while (1) switch (context$3$0.prev = context$3$0.next) {
							case 0:
								listener.apply(this, Array.prototype.slice.call(args$3$0));

							case 1:
							case 'end':
								return context$3$0.stop();
						}
					}, generator, this);
				})
			};

			this.wrapperMap.push(wrapper);

			return wrapper.generator;
		}
	}, {
		key: 'setInitialState',
		value: function setInitialState(state) {

			// Reset state and apply new state
			this._state = _Object$assign({}, state);
		}
	}, {
		key: 'getState',
		value: function getState(stateName, defState) {

			if (!this._state[stateName]) this._state[stateName] = defState || {};

			return this._state[stateName];
		}
	}, {
		key: 'createInstance',
		value: function createInstance() {
			return new Core();
		}
	}, {
		key: 'state',
		get: function get() {
			return this._state;
		},
		set: function set(val) {
			this._state = _Object$assign(this._state, val);
		}
	}]);

	return Core;
})(_dispatcher2['default']);

module.exports = Core;

// Using customized handler if it exists

// Forwarding event to store