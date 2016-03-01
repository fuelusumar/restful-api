var express = require('express');
var router = express.Router();
var endptsHlpr = require('../../helpers/endpoints');
var authHlpr = require('../../helpers/auth');
var flwCtrl = require('../../controllers/follow');
var expressJWT = require('express-jwt');
/**
 * JWT middleware
 */
router.use(expressJWT(global.security.options));
router.use(authHlpr.renewToken);
/**
 * @api {get} /v1/users/:user_id/follows list who user follows
 * @apiVersion 0.0.1
 * @apiName findFlws
 * @apiGroup follows
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {Number} page number of page
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} data array of follow objects
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.get('/users/:user_id/follows', function (req, res, next) {
	try {
		// findFlws(_usr_id, page, callback)
		var page = parseInt(req.query.page, 10) || 1;
		flwCtrl.findFlws(req.params.user_id, page, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "list",
					data: result,
					links: endptsHlpr.loadEnpoints('v1', 'follows').getHyper(req.method, req.headers.host, req.originalUrl, req.params),
					auth: req.auth
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {get} /v1/users/:user_id/follows/me list who follows user
 * @apiVersion 0.0.1
 * @apiName findUsrs
 * @apiGroup follows
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {Number} page number of page
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} data array of follow objects
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.get('/users/:user_id/follows/me', function (req, res, next) {
	try {
		// findFlwsMe(_usr_id, page, callback)
		var page = parseInt(req.query.page, 10) || 1;
		flwCtrl.findFlwsMe(req.params.user_id, page, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "list",
					data: result,
					links: endptsHlpr.loadEnpoints('v1', 'follows').getHyper(req.method, req.headers.host, req.originalUrl, req.params),
					auth: req.auth
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {get} /v1/users/:user_id/follows/:follow_id rertieve a follow reltion
 * @apiVersion 0.0.1
 * @apiName findUsrs
 * @apiGroup follows
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {ObjectID} follow_id follow relation unique id
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object} data follow object
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.get('/users/:user_id/follows/:follow_id', function (req, res, next) {
	try {
		// findFlwById(_id, callback)
		flwCtrl.findFlwById(req.params.follow_id, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "retrieve",
					data: result,
					links: endptsHlpr.loadEnpoints('v1', 'follows').getHyper(req.method, req.headers.host, req.originalUrl, req.params),
					auth: req.auth
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {post} /v1/users/:user_id/follows create a follow relation
 * @apiVersion 0.0.1
 * @apiName findUsrs
 * @apiGroup follows
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {ObjectID} user_id users unique id
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object} data follow object
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.post('/users/:user_id/follows', function (req, res, next) {
	try {
		// insertFlw(flw_obj, callback)
		flwCtrl.insertFlw({
			_usr: req.params.user_id,
			_flw: req.body.user_id
		}, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "create",
					data: result,
					links: endptsHlpr.loadEnpoints('v1', 'follows').getHyper(req.method, req.headers.host, req.originalUrl, req.params),
					auth: req.auth
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {delete} /v1/users/:user_id/follows/:follow_id delete a follow relation
 * @apiVersion 0.0.1
 * @apiName findUsrs
 * @apiGroup follows
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {ObjectID} follow_id follow relation unique id
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} data array of user objects
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.delete('/users/:user_id/follows/:follow_id', function (req, res, next) {
	try {
		// deleteFlwById(_id, callback)
		flwCtrl.deleteFlwById(req.params.follow_id, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "delete",
					data: result,
					links: endptsHlpr.loadEnpoints('v1', 'follows').getHyper(req.method, req.headers.host, req.originalUrl, req.params),
					auth: req.auth
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {options} /v1/users/:user_id/follows/:follow_id specific follow options
 * @apiVersion 0.0.1
 * @apiName findUsrs
 * @apiGroup follows
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {ObjectID} follow_id follow relation unique id
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.options('/users/:user_id/follows/:follow_id', function (req, res, next) {
	try {
		res.status(200).send({
			action: "options",
			_links: endptsHlpr.loadEnpoints('v1', 'follows').getHyper(req.method, req.headers.host, req.originalUrl, req.params),
			auth: req.auth
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {get} /v1/users/:user_id/follows follow options
 * @apiVersion 0.0.1
 * @apiName findUsrs
 * @apiGroup follows
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.options('/users/:user_id/follows', function (req, res, next) {
	try {
		res.status(200).send({
			action: "options",
			_links: endptsHlpr.loadEnpoints('v1', 'follows').getHyper(req.method, req.headers.host, req.originalUrl, req.params),
			auth: req.auth
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