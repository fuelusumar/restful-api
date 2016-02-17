var express = require('express');
var router = express.Router();
var endptsHlpr = require('../../helpers/endpoints');
var authCtrl = require('../../controllers/auth');
/**
 * @api {post} /v1/auth/login log in as an user
 * @apiVersion 0.0.1
 * @apiName login
 * @apiGroup auth
 *
 * @apiParam {Object} body login object to be created
 * @apiParam {String} body.usrnm users username or email
 * @apiParam {String} body.passwd users password
 * 
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object} data created user object
 * @apiSuccess {Object[]} _links hypermedia
 */
router.post('/auth/login', function (req, res, next) {
	try {
		authCtrl.login(req.body, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "login",
					data: result,
					_links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * @api {post} /v1/auth/signin sign in and create an user
 * @apiVersion 0.0.1
 * @apiName signin
 * @apiGroup auth
 *
 * @apiParam {Object} body user object to be created
 * @apiParam {String} body.usrnm users username
 * @apiParam {String} body.passwd users password
 * @apiParam {String} body.email users email
 * @apiParam {String} body.name users name
 *
 * @apiSuccess (Success 201) {String} action indicates done action
 * @apiSuccess (Success 201) {Object} data created user object
 * @apiSuccess (Success 201) {Object[]} _links hypermedia
 */
router.post('/auth/signin', function (req, res, next) {
	try {
		authCtrl.signin(req.body, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "signin",
					data: result,
					_links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/*
router.post('/auth/logout'function (req, res, next) {
	try {
		authCtrl.logout(req.body, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "logout",
					data: result,
					_links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
*/
module.exports = router;