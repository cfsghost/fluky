import co from 'co';

class Dispatcher {

	constructor() {
		this.listeners = {};
	}

	on(eventName, handler) {
		var e = this.listeners[eventName] || [];

		// Whether handler exists or not
		if (e.indexOf(handler) > -1)
			return;

		// Register
		e.push(handler);
		this.listeners[eventName] = e;
	}

	off(eventName, handler) {
		var e = this.listeners[eventName] || null;
		if (!e)
			return;

		// Whether handler exists or not
		const index = e.indexOf(handler);
		if (index == -1)
			return;

		// Remove
		e.splice(index, 1);
	}

	hasListeners(eventName) {
		var e = this.listeners[eventName] || [];
		if (!e.length)
			return false;

		return true;
	}

	emit(eventName) {
		var e = this.listeners[eventName] || [];
		var args = Array.prototype.slice.call(arguments);
		args.shift();

		return function(done) {

			co(function *() {

				for (var index in e) {

					// Callback is a generator
					var handler = co.wrap(e[index]);

					// Run and wait
					args = yield function(done) {
						handler
							.apply(this, args)
							.then(function(ret) {
								if (ret === undefined) {
									done(null, args);
								} else {
									done(null, [ ret ]);
								}
							}, function(err) {
								done(err);
							});
					}.bind(this);
				}

				done();
			}.bind(this));
		}.bind(this)
	}
}

export default Dispatcher;
