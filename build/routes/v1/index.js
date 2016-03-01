var express = require('express');
var router = express.Router();
// split up route handling
var authRouter = require('./auth');
var usersRouter = require('./users');
var followsRouter = require('./follows');
/**
 * [description]
 *
 * @method
 *
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next  [description]
 *
 * @return {[type]} [description]
 */
router.get('/', function (req, res, next) {
	try {
		res.status(200).send({
			message: "v1"
		});
	} catch (err) {
		next(err);
	}
});
// list route namespaces
router.use('/', authRouter);
router.use('/', usersRouter);
router.use('/', followsRouter);
// etc.
module.exports = router;