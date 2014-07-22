var Model = require('./base');
var util = require('util');

var usersModel = Model.extend({});

usersModel.collection = "users";

usersModel.schema({
	title: {type: 'String'},
	identifier: {type: 'String'},
	deleted: {type: 'Integer', 'default': 1}
});

module.exports = usersModel;
