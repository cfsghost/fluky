
class FEvent {

	constructor(event, args) {
		var parts = event.split('.');

		this.path = event;
		this.type = parts.shift();
		this.category = parts.shift();
		this.name = parts.join('.');
		this.args = Array.prototype.slice.call(args);
	}
}

module.exports = FEvent;
