'use strict';

function next() {
	return function (e) {
		e(null, !0);
	};
}

var _get = require('babel-runtime/helpers/get')['default'],
    _inherits = require('babel-runtime/helpers/inherits')['default'],
    _createClass = require('babel-runtime/helpers/create-class')['default'],
    _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'],
    _regeneratorRuntime = require('babel-runtime/regenerator')['default'],
    _Object$assign = require('babel-runtime/core-js/object/assign')['default'],
    _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'],
    _co = require('co'),
    _co2 = _interopRequireDefault(_co),
    _dispatcher = require('./dispatcher'),
    _dispatcher2 = _interopRequireDefault(_dispatcher),
    _fevent = require('./fevent'),
    _fevent2 = _interopRequireDefault(_fevent),
    Core = (function (e) {
	function t() {
		_classCallCheck(this, t), _get(Object.getPrototypeOf(t.prototype), 'constructor', this).call(this), this.isBrowser = !1, this.options = {}, this.disabledEventHandler = !1, this.serverRendering = !1, this.middlewares = [], this.handlers = [], this.wrapperMap = [], this._state = {}, this.use(_regeneratorRuntime.mark(function e(t, r) {
			var a, n;
			return _regeneratorRuntime.wrap(function (e) {
				for (;;) switch (e.prev = e.next) {
					case 0:
						if ('action' == t.type) {
							e.next = 4;
							break;
						}

						return (e.next = 3, r());

					case 3:
						return e.abrupt('return', e.sent);

					case 4:
						if (!this.hasListeners(t.path)) {
							e.next = 8;
							break;
						}

						return (e.next = 7, this.emit.apply(this, t.args));

					case 7:
						return e.abrupt('return');

					case 8:
						a = t.args.slice(0), a[0] = 'store.' + t.category + '.' + t.name, n = new _fevent2['default'](a[0], a), this.internalDispatch(n);

					case 12:
					case 'end':
						return e.stop();
				}
			}, e, this);
		})), this.use(_regeneratorRuntime.mark(function r(e, t) {
			return _regeneratorRuntime.wrap(function (t) {
				for (;;) switch (t.prev = t.next) {
					case 0:
						if (!this.serverRendering) {
							t.next = 3;
							break;
						}

						if ('state' != e.type) {
							t.next = 3;
							break;
						}

						return t.abrupt('return');

					case 3:
						return (t.next = 5, this.emit.apply(this, e.args));

					case 5:
					case 'end':
						return t.stop();
				}
			}, r, this);
		}));
	}

	return (_inherits(t, e), _createClass(t, [{
		key: 'use',
		value: function () {
			this.middlewares.push(arguments[0].bind(this));
		}
	}, {
		key: 'loadHandler',
		value: function (e) {
			var t = !1;

			for (var r in this.handlers) if (this.handlers[r] == e) {
				t = !0;
				break;
			}

			t || ((0, _co2['default'])(e.bind(this)), this.handlers.push(e));
		}
	}, {
		key: 'load',
		value: function () {
			for (var e in arguments) {
				var t = arguments[e];

				if (!(t instanceof Function)) {
					var r = t;

					for (var a in r) this.loadHandler(r[a]);
				}
			}
		}
	}, {
		key: 'dispatch',
		value: function (e) {
			if (!this.disabledEventHandler) {
				var t = new _fevent2['default'](e, arguments);
				this.internalDispatch(t);
			}
		}
	}, {
		key: 'internalDispatch',
		value: function (e) {
			(0, _co2['default'])(_regeneratorRuntime.mark(function t() {
				var r, a, n;
				return _regeneratorRuntime.wrap(function (t) {
					for (;;) switch (t.prev = t.next) {
						case 0:
							t.t0 = _regeneratorRuntime.keys(this.middlewares);

						case 1:
							if ((t.t1 = t.t0()).done) {
								t.next = 17;
								break;
							}

							return (r = t.t1.value, a = this.middlewares[r], t.prev = 4, t.delegateYield(a(e, next), 't2', 6));

						case 6:
							n = t.t2, t.next = 13;
							break;

						case 9:
							return (t.prev = 9, t.t3 = t['catch'](4), console.log(t.t3), t.abrupt('break', 17));

						case 13:
							if (n) {
								t.next = 15;
								break;
							}

							return t.abrupt('break', 17);

						case 15:
							t.next = 1;
							break;

						case 17:
						case 'end':
							return t.stop();
					}
				}, t, this, [[4, 9]]);
			}).bind(this));
		}
	}, {
		key: 'off',
		value: function (e, r) {
			for (var a in this.wrapperMap) {
				var n = this.wrapperMap[a];
				if (n.listener == r) return (this.wrapperMap.splice(a, 1), void _get(Object.getPrototypeOf(t.prototype), 'off', this).call(this, e, n.generator));
			}

			_get(Object.getPrototypeOf(t.prototype), 'off', this).call(this, e, r);
		}
	}, {
		key: 'bindListener',
		value: function (e) {
			for (var t in this.wrapperMap) {
				var r = this.wrapperMap[t];
				if (r.listener == e) return r.generator;
			}

			var r = {
				listener: e,
				generator: _regeneratorRuntime.mark(function a() {
					var t = arguments;
					return _regeneratorRuntime.wrap(function (r) {
						for (;;) switch (r.prev = r.next) {
							case 0:
								e.apply(this, Array.prototype.slice.call(t));

							case 1:
							case 'end':
								return r.stop();
						}
					}, a, this);
				})
			};
			return (this.wrapperMap.push(r), r.generator);
		}
	}, {
		key: 'setInitialState',
		value: function (e) {
			this._state = _Object$assign({}, e);
		}
	}, {
		key: 'getState',
		value: function (e, t) {
			return (this._state[e] || (this._state[e] = t || {}), this._state[e]);
		}
	}, {
		key: 'setState',
		value: function (e, t) {
			this._state[e] ? this._state[e] = _Object$assign(this._state[e], t) : this._state[e] = t;
		}
	}, {
		key: 'createInstance',
		value: function () {
			return new t();
		}
	}, {
		key: 'state',
		get: function () {
			return this._state;
		},
		set: function (e) {
			this._state = _Object$assign(this._state, e);
		}
	}]), t);
})(_dispatcher2['default']);

module.exports = Core;

// Action

// Using customized handler if it exists

// Forwarding event to store

// Dispatch events

// Ignore state change event

// It's an array

// For isomorphic app, sometimes no need to handle event on server-side

// Using all middlewares to handle this event

// Find listener and remove its generator

// Don't wrap again if it exists

// add to list

// Reset state and apply new state
var _createClass = require('babel-runtime/helpers/create-class')['default'],
    _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'],
    _regeneratorRuntime = require('babel-runtime/regenerator')['default'],
    _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
	value: !0
});

var _co = require('co'),
    _co2 = _interopRequireDefault(_co),
    Dispatcher = (function () {
	function e() {
		_classCallCheck(this, e), this.listeners = {}, this._refs = 0;
	}

	return (_createClass(e, [{
		key: 'on',
		value: function (e, t) {
			var r = this.listeners[e] || [];
			r.indexOf(t) > -1 || (r.push(t), this.listeners[e] = r);
		}
	}, {
		key: 'off',
		value: function (e, t) {
			var r = this.listeners[e] || null;

			if (r) {
				var n = r.indexOf(t);
				-1 != n && r.splice(n, 1);
			}
		}
	}, {
		key: 'hasListeners',
		value: function (e) {
			var t = this.listeners[e] || [];
			return t.length ? !0 : !1;
		}
	}, {
		key: 'emit',
		value: function (e) {
			var t = 'idle' == e,
			    r = this.listeners[e] || [],
			    n = Array.prototype.slice.call(arguments);
			return (n.shift(), t || this._refs++, (function (e) {
				(0, _co2['default'])(_regeneratorRuntime.mark(function a() {
					var i, s;
					return _regeneratorRuntime.wrap(function (a) {
						for (;;) switch (a.prev = a.next) {
							case 0:
								a.t0 = _regeneratorRuntime.keys(r);

							case 1:
								if ((a.t1 = a.t0()).done) {
									a.next = 17;
									break;
								}

								return (i = a.t1.value, s = _co2['default'].wrap(r[i]), a.prev = 4, a.next = 7, (function (e) {
									s.apply(this, n).then(function (t) {
										undefined === t ? e(null, n) : e(null, [t]);
									}, function (t) {
										e(t);
									});
								}).bind(this));

							case 7:
								n = a.sent, a.next = 15;
								break;

							case 10:
								if ((a.prev = 10, a.t2 = a['catch'](4), 'document is not defined' == a.t2.message && -1 != a.t2.stack.indexOf('at getActiveElement'))) {
									a.next = 15;
									break;
								}

								return (e(a.t2), a.abrupt('return'));

							case 15:
								a.next = 1;
								break;

							case 17:
								if ((t || this._refs--, e(), this._refs || t)) {
									a.next = 22;
									break;
								}

								return (a.next = 22, this.emit('idle'));

							case 22:
							case 'end':
								return a.stop();
						}
					}, a, this, [[4, 10]]);
				}).bind(this));
			}).bind(this));
		}
	}]), e);
})();

exports['default'] = Dispatcher, module.exports = exports['default'];

// Whether handler exists or not

// Register

// Whether handler exists or not

// Remove

// Increase reference counter

// Callback is a generator

// Run and wait

// Workaround: React 0.13 has a bug on server rendering that document object wasn't found.
// Just ignore it because it doesn't affect anything on server-side.

// Decrease reference counter

// Everything is done, fire the idle event
var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'],
    FEvent = function e(t, r) {
	_classCallCheck(this, e);

	var a = t.split('.');
	this.path = t, this.type = a.shift(), this.category = a.shift(), this.name = a.join('.'), this.args = Array.prototype.slice.call(r);
};

module.exports = FEvent;
var Core = require('./core'),
    core = new Core();

'undefined' != typeof window && (window.Fluky && window.Fluky.state && core.setInitialState(window.Fluky.state), core.isBrowser = !0), module.exports = core;

// Load default state on browser-side

// set browser flag
