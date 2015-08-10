'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var FEvent = function FEvent(event, args) {
	_classCallCheck(this, FEvent);

	var parts = event.split('.');

	this.path = event;
	this.type = parts.shift();
	this.category = parts.shift();
	this.name = parts.join('.');
	this.args = Array.prototype.slice.call(args);
};

module.exports = FEvent;