import co from 'co';

class Dispatcher {

	constructor() {
		this.listeners = {};
		this._refs = 0;
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
		var idleEvent = (eventName == 'idle');
		var e = this.listeners[eventName] || [];
		var args = Array.prototype.slice.call(arguments);
		args.shift();

		// Increase reference counter
		if (!idleEvent) {
			this._refs++;
		}

		return function(done) {

			co(function *() {

				for (var index in e) {

					// Callback is a generator
					var handler = co.wrap(e[index]);

					// Run and wait
					try {
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

					} catch(e) {
						// Workaround: React 0.13 has a bug on server rendering that document object wasn't found.
						// Just ignore it because it doesn't affect anything on server-side. 
						if (e.message != 'document is not defined' || e.stack.indexOf('at getActiveElement') == -1) {
							done(e);
							return;
						}
					}

				}

				// Decrease reference counter
				if (!idleEvent) {
					this._refs--;
				}

				done();

				// Everything is done, fire the idle event
				if (!this._refs && !idleEvent)
					yield this.emit('idle');
			}.bind(this));
		}.bind(this)
	}
}

export default Dispatcher;
