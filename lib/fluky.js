'use strict';

var Core = require('./core');

var core = new Core();

// Load default state on browser-side
if (window) {
	if (window.Fluky) {
		if (window.Fluky.state) {
			core.setInitialState(window.Fluky.state);
		}
	}
}

module.exports = core;