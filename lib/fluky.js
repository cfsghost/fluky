'use strict';

var Core = require('./core');

var core = new Core();

// Load default state on browser-side
if (typeof window != 'undefined') {
	if (window.Fluky) {
		if (window.Fluky.state) {
			core.setInitialState(window.Fluky.state);
		}
	}

	// set browser flag
	core.isBrowser = true;
}

module.exports = core;