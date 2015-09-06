'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var Dispatcher = (function () {
	function Dispatcher() {
		_classCallCheck(this, Dispatcher);

		this.listeners = {};
		this._refs = 0;
	}

	_createClass(Dispatcher, [{
		key: 'on',
		value: function on(eventName, handler) {
			var e = this.listeners[eventName] || [];

			// Whether handler exists or not
			if (e.indexOf(handler) > -1) return;

			// Register
			e.push(handler);
			this.listeners[eventName] = e;
		}
	}, {
		key: 'off',
		value: function off(eventName, handler) {
			var e = this.listeners[eventName] || null;
			if (!e) return;

			// Whether handler exists or not
			var index = e.indexOf(handler);
			if (index == -1) return;

			// Remove
			e.splice(index, 1);
		}
	}, {
		key: 'hasListeners',
		value: function hasListeners(eventName) {
			var e = this.listeners[eventName] || [];
			if (!e.length) return false;

			return true;
		}
	}, {
		key: 'emit',
		value: function emit(eventName) {
			var idleEvent = eventName == 'idle';
			var e = this.listeners[eventName] || [];
			var args = Array.prototype.slice.call(arguments);
			args.shift();

			// Increase reference counter
			if (!idleEvent) {
				this._refs++;
			}

			return (function (done) {

				(0, _co2['default'])(_regeneratorRuntime.mark(function callee$3$0() {
					var index, handler;
					return _regeneratorRuntime.wrap(function callee$3$0$(context$4$0) {
						while (1) switch (context$4$0.prev = context$4$0.next) {
							case 0:
								context$4$0.t0 = _regeneratorRuntime.keys(e);

							case 1:
								if ((context$4$0.t1 = context$4$0.t0()).done) {
									context$4$0.next = 15;
									break;
								}

								index = context$4$0.t1.value;
								handler = _co2['default'].wrap(e[index]);
								context$4$0.prev = 4;
								context$4$0.next = 7;
								return (function (done) {
									handler.apply(this, args).then(function (ret) {
										if (ret === undefined) {
											done(null, args);
										} else {
											done(null, [ret]);
										}
									}, function (err) {
										done(err);
									});
								}).bind(this);

							case 7:
								args = context$4$0.sent;
								context$4$0.next = 13;
								break;

							case 10:
								context$4$0.prev = 10;
								context$4$0.t2 = context$4$0['catch'](4);

								// Workaround: React 0.13 has a bug on server rendering that document object wasn't found.
								// Just ignore it because it doesn't affect anything on server-side.
								if (context$4$0.t2.message != 'document is not defined' || context$4$0.t2.stack.indexOf('at getActiveElement') == -1) console.log(context$4$0.t2.stack);

							case 13:
								context$4$0.next = 1;
								break;

							case 15:

								// Decrease reference counter
								if (!idleEvent) {
									this._refs--;
								}

								done();

								// Everything is done, fire the idle event

								if (!(!this._refs && !idleEvent)) {
									context$4$0.next = 20;
									break;
								}

								context$4$0.next = 20;
								return this.emit('idle');

							case 20:
							case 'end':
								return context$4$0.stop();
						}
					}, callee$3$0, this, [[4, 10]]);
				}).bind(this));
			}).bind(this);
		}
	}]);

	return Dispatcher;
})();

exports['default'] = Dispatcher;
module.exports = exports['default'];

// Callback is a generator

// Run and wait