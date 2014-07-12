var env = process.argv.pop();

var blog = require('./server/index');
var server = blog.init();
if(env == 'live'){
    server.listen(8080);
}
module.exports = server;
