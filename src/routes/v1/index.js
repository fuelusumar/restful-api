var express = require('express');
var router = express.Router();
// split up route handling
var usersRouter = require('./users');
var friendsRouter = require('./friends');
/**
 * [auth description]
 *
 * @method auth
 *
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 *
 * @return {[type]}   [description]
 */
var auth = function (req, res, next) {
	/*var axs_key = req.query.axs_key;
	var digest = req.query.digest;
	authMod.verifyTkn(axs_key, digest, function (err_auth, res_auth) {
	    if (res_auth) {
	        req.body.usr_id = req.params.usr_id;
	        next();
	    } else {
	        res.status(401).send({
	            'message': err_auth.message
	        });
	    }
	});*/
	next();
};
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
router.use('/', auth, usersRouter);
router.use('/', auth, friendsRouter);
// etc.
module.exports = router;