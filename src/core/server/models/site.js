var Model = require('./base');
var util = require('util');

var siteModel = Model.extend({
    test: function(){
        console.log('called test');
    }
});

siteModel.collection = "site";

siteModel.schema({
    title: {type: 'String'},
    identifier: {type: 'String'},
    deleted: {type: 'Integer', 'default': 1}
});

module.exports = siteModel;
