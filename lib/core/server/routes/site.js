var site = require('../controllers/site');
var express = require('express');
var router = express.Router();

router.route('/home').get(site.home);
router.route('/').get(site.home);
router.route('/req').get(site.req);
router.route('/add_page').post(site.add_page);
router.route('/:ident').get(site.page);
router.route('/:ident').put(site.update);
router.route('/:ident').delete(site.remove);

module.exports = router;
