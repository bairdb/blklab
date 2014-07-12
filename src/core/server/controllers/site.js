var Model = require('../models/base');
var siteModel = require('../models/site');

var controllers = {
    home: function(req, res) {
        siteModel.load({}, function(err, items){
            if(err){
                res.send('Error ' + err);
            }else{
                res.send(items);
            }
        });
    },

    req: function(req, res){
        res.sendfile('/var/www/core/server/views/test.html');
    },

    page: function(req, res) {
        var path = req.params.ident;
        siteModel.load({'identifier': path}, function(err, items){
            if(err){
                res.send('Error ' + err);
            }else{
                res.send(items);
            }
        });
    },

    //Temp Methods
    add_page: function(req, res){
        Model.insert('site', req.body, function(err, result){
            if(err){
                res.send('Error ' + err);
            }else{
                res.send(result);
            }
        });
    }
};

module.exports = controllers;
