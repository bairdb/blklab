var Model = require('../models/base');
var usersModel = require('../models/users');

var controllers = {
	all: function(req, res) {
		usersModel.load({"deleted":{$ne:1}}, function(err, items){
			if(err){
				res.send('Error ' + err);
			}else{
				res.send(items);
			}
		});
	},

	add: function(req, res) {
		Model.insert("users", req.body, function(err, result){
			if(err){
				res.send('Error ' + err);
			}else{
				res.send(result);
			}
		});
	},

	single: function(req, res) {
		usersModel.findOne({"identifier": req.params.id, "deleted":{$ne:1}}, function(err, items){
			if(err){
				res.send('Error ' + err);
			}else{
				res.send(items);
			}
		});
	},

	update: function(req, res) {
		usersModel.update({"identifier": req.params.id}, req.body, function(err, result){
			if(err){
				res.send('Error ' + err);
			}else{
				res.send({"result": result});
			}
		});
	},

	del: function(req, res) {
		usersModel.update({"identifier": req.params.id}, {"deleted": 1}, function(err, result){
			if(err){
				res.send('Error ' + err);
			}else{
				res.send({"result": result});
			}
		});
	},

};

module.exports = controllers;
