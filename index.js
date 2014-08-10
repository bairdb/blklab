var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var systemRoutes = require('./core/server/routes');

exports.init = function(appRoutes){
	var server = express();

	server.set('port', process.env.PORT || 8080);
	server.set('views', path.join(__dirname, 'views'));
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded());
	server.use(cookieParser());
	server.use(favicon());
	server.use(express.static(path.join(__dirname, 'public')));

	//routes
	server.use('/', systemRoutes.site);
	for(var r in appRoutes){
		server.use(appRoutes[r].path, appRoutes[r].module);
	}

	// development only
	if (server.get('env') === 'development') {
		server.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	/// catch 404 and forwarding to error handler
	server.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	return server;
};
