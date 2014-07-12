var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');

exports.init = function(){
    var server = express();

    server.set('port', process.env.PORT || 8080);
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded());
    server.use(cookieParser());
    server.use(favicon());
    server.use(express.logger('dev'));
    server.use(express.json());
    server.use(express.urlencoded());
    server.use(express.methodOverride());
    server.use(server.router);
    server.use(express.static(path.join(__dirname, 'public')));
    server.set('views', path.join(__dirname, 'views'));

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

    routes.admin(server);
    routes.site(server);

    return server;
};
