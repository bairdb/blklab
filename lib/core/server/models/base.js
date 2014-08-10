var EventEmitter = require('events').EventEmitter;
var uuid = require('node-uuid');
var config = require('../../../config');

var Connection = require('mongodb').Connection
var host = 'localhost';
var port = Connection.DEFAULT_PORT;
var client = require("mongodb").MongoClient;
var mydb;

function Model(options){
    this.super_ = {};
    this._schema = {};
    this.collection = '';
    this.data = {};
    this.db = '';
}

Model.prototype.connection = Model.connection = function(collection, callback){
    if(mydb === undefined){
        client.connect("mongodb://" + host + ":" + port + "/" + config.dbname, function(err, db) {
            if (err) return callback(err);
            mydb = db;
            var col = db.collection(collection);
            col.ensureIndex({name: true}, function(err) {
                if (err) return callback(err)
                callback(null, col)
            })
        });
    }else{
        var col = mydb.collection(collection);
        col.ensureIndex({name: true}, function(err) {
            if (err) return callback(err)
            callback(null, col)
        });
    }
}

Model.prototype.collection = '';

Model.prototype.schema = function(obj){
    var self = this;
    var keys = Object.keys(obj);
    for(i=0; i<keys.length; i++){
        var key = keys[i];
        if(self._schema.hasOwnProperty(obj[key]) === false){
            self._schema[key] = obj[key];
            var def = obj[key].default;
            if(def){
                self.data[key] = self[key] = def;
            }else{
                self.data[key] = self[key] = null;
            }
        }
    }
    return self;
}

Model.prototype.get = function(key){
    if(key in this.data){
        return this.data[key];
    }else{
        return null;
    }
}

Model.prototype.set = function(key, val){
    if(key in this.data){
        this.data[key] = val;
    }
    return this;
}

Model.prototype.load = function(query, callback){
    var self = this;
    this.connection(self.collection, function(err, collection){
        if(err){return callback(err);}
        collection.find(query).toArray(function(err, items){
            callback(err, items);
        });
    })
}

Model.prototype.findOne = function(query, callback){
	var self = this;
	this.connection(self.collection, function(err, collection){
		if(err){return callback(err);}
		collection.findOne(query, function(err, item){
			callback(err, item);
		});
	})
}

Model.prototype.update = function(query, qupdate, callback){
	var self = this;
	this.connection(self.collection, function(err, collection){
		collection.update(query, {$set:qupdate}, {w:1}, function(err, result){
			callback(err, result);
		});
	})
}

Model.prototype.del = function(query, callback){
	var self = this;
	this.connection(self.collection, function(err, collection){
		if(err){return callback(err);}
		collection.remove(query, {w:1}, function(err, result){
			callback(err, result);
		});
	})
}

//Static

Model.extend = function(methods){
    var self = new Model();
    self.db = Model.db;
    for(method in methods){
        if (self.hasOwnProperty(method) === false) {
            self[method] = methods[method];
        }else{
            self.super_[method] = self[method];
            self[method] = methods[method];
        }
    }
    return self;
}

Model.init = function(){
    return new Model();
}

Model.find = function(collection, query){
    return this;
}

Model.insert = function(colname, query, callback){
    Model.connection(colname, function(err, collection){
        collection.insert(query, {w:1}, function(err, result){
            callback(err, result);
        });
    });
}

Model.prototype.__proto__ = EventEmitter.prototype;


module.exports = Model;
