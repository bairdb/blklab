var [[module]] = require('../controllers/[[module]]');
var express = require('express');
var router = express.Router();

router.route('/').get([[module]].all);
router.route('/').post([[module]].add);
router.route('/:id').get([[module]].single);
router.route('/:id').put([[module]].update);
router.route('/:id').delete([[module]].del);

module.exports = router;
