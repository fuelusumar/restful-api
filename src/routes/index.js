var express = require('express');
var path = require('path');
var router = express.Router();
var v1 = require('./v1');
//
router.use('/v1', v1);
/* GET home page. */
router.all('/', function (req, res) {
	res.render('index.html');
});
module.exports = router;