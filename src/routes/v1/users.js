var express = require('express');
var router = express.Router();
var endptsHlpr = require('../../helpers/endpoints');
var usrCtrl = require('../../controllers/user');
var expressJWT = require('express-jwt');
/**
 * JWT middleware
 */
router.use(expressJWT(global.security.options));
/**
 * @api {get} /v1/users list users
 * @apiVersion 0.0.1
 * @apiName findUsrs
 * @apiGroup users
 * @apiPermission user has to have a token
 *
 * @apiParam {Number} page number of page
 * @apiParam {String} order user parameter to do order with
 * @apiParam {String} usrnm users username to search for
 * @apiParam {String} email users email to search for
 * @apiParam {String} name users name to search for
 * @apiParam {String} lang users languague to search for
 * @apiParam {String} country users country to search for
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} data array of user objects
 * @apiSuccess {Object[]} links hypermedia
 */
router.get('/users', function (req, res, next) {
	try {
		var query = {};
		var order = {};
		var page = parseInt(req.query.page, 10) || 1;
		order[req.query.order || '_id'] = -1;
		for (var key in req.query) {
			if (key != 'order' && key != 'limit' && key != 'skip' && key != 'axs_key' && key != 'digest' && key != 'page') {
				query[key] = req.query[key];
			}
		}
		usrCtrl.findUsrs(query, page, order, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "list",
					data: result,
					links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {get} /v1/users/:user_id request user information
 * @apiVersion 0.0.1
 * @apiName findUsrById
 * @apiGroup users
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object} data user object
 * @apiSuccess {Object[]} links hypermedia
 * 
 */
router.get('/users/:user_id', function (req, res, next) {
	try {
		usrCtrl.findUsrById(req.params.user_id, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "retrieve",
					data: result,
					links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {post} /v1/users create an user
 * @apiVersion 0.0.1
 * @apiName insertUsr
 * @apiGroup users
 * @apiPermission user has to have a token
 *
 * @apiParam {Object} body user object to be created
 * @apiParam {String} body.usrnm users username
 * @apiParam {String} body.passwd users password
 * @apiParam {String} body.email users email
 * @apiParam {String} body.name users name
 *
 * @apiSuccess (Success 201) {String} action indicates done action
 * @apiSuccess (Success 201) {Object} data created user object
 * @apiSuccess (Success 201) {Object[]} links hypermedia
 */
router.post('/users', function (req, res, next) {
	try {
		usrCtrl.insertUsr(req.body, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "create",
					data: result,
					links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {put} /v1/users/:user_id update an user
 * @apiVersion 0.0.1
 * @apiName updateUsr
 * @apiGroup users
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {Object} body user object to be updated
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object} data user object
 * @apiSuccess {Object[]} links hypermedia
 */
router.put('/users/:user_id', function (req, res, next) {
	try {
		usrCtrl.updateOrPatchUsr(req.body, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "update",
					data: result,
					links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {patch} /v1/users/:user_id partially update an user
 * @apiVersion 0.0.1
 * @apiName patchUsr
 * @apiGroup users
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {Object} body user object to be updated
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object} data user object
 * @apiSuccess {Object[]} links hypermedia
 */
router.patch('/users/:user_id', function (req, res, next) {
	try {
		usrCtrl.updateOrPatchUsr(req.body, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "partial",
					data: result,
					links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {delete} /v1/users/:user_id delete an user
 * @apiVersion 0.0.1
 * @apiName deleteUsrById
 * @apiGroup users
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 *
 * @apiSuccess (Success 204) {Undefined} data no content
 */
router.delete('/users/:user_id', function (req, res, next) {
	try {
		usrCtrl.deleteUsrById(req.params.user_id, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "delete",
					data: result,
					links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {options} /v1/users/:user_id specific user options
 * @apiVersion 0.0.1
 * @apiName userOptions
 * @apiGroup users
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} links hypermedia
 */
router.options('/users/:user_id', function (req, res, next) {
	try {
		res.status(200).send({
			action: "options",
			links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {options} /v1/users user options
 * @apiVersion 0.0.1
 * @apiName usersOptions
 * @apiGroup users
 * @apiPermission user has to have a token
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} links hypermedia
 */
router.options('/users', function (req, res, next) {
	try {
		res.status(200).send({
			action: "options",
			links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
		});
	} catch (err) {
		next(err);
	}
});
/**
 * [exports description]
 *
 * @type {[type]}
 */
module.exports = router;