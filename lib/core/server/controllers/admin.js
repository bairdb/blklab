var controllers = {
    'home': function(req, res) {
        res.send('admin home');
    },

    test: function(req, res){
        res.send('admin test');
    }
};

module.exports = controllers;
