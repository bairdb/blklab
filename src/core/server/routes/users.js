var users = require('../controllers/users');
var express = require('express');
var router = express.Router();

router.route('/').get(users.all);
router.route('/').post(users.add);
router.route('/:id').get(users.single);
router.route('/:id').put(users.update);
router.route('/:id').delete(users.del);

module.exports = router;
