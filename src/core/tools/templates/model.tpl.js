var Model = require('./base');
var util = require('util');

var [[module]]Model = Model.extend({});

[[module]]Model.collection = "[[module]]";

[[module]]Model.schema({
	title: {type: 'String'},
	identifier: {type: 'String'},
	deleted: {type: 'Integer', 'default': 1}
});

module.exports = [[module]]Model;
