var site = require('../controllers/site');

module.exports = function(server){
    server.get('/home', site.home);
    server.get('/', site.home);
    server.get('/req', site.req);
    server.get('/:ident', site.page);

    server.post('/pages/create/:name', site.add_page);
};
