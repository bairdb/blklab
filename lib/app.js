var env = process.argv.pop();

var blog = require('./index');
var server = blog.init();
if(env == 'live'){
	server.listen(4000);
}
module.exports = server;
