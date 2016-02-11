var express = require('express');
var router = express.Router();
var endptsHlpr = require('../../helpers/endpoints');
var friendsRouter = require('./friends');
router.get('/users', function (req, res, next) {
	try {
		/*console.dir(req.method);
		console.dir(req.headers.host);
		console.dir(req.baseUrl);
		console.dir(req.originalUrl);
		console.dir(req.url);
		console.dir(req.route.path);*/
		res.status(200).send({
			message: "list",
			_links: endptsHlpr.getLinks('v1', 'users', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.get('/users/:user_id', function (req, res, next) {
	try {
		res.status(200).send({
			message: "retrieve",
			_links: endptsHlpr.getLinks('v1', 'users', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.post('/users', function (req, res, next) {
	try {
		res.status(200).send({
			message: "create",
			_links: endptsHlpr.getLinks('v1', 'users', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.put('/users/:user_id', function (req, res, next) {
	try {
		res.status(200).send({
			message: "update",
			_links: endptsHlpr.getLinks('v1', 'users', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.patch('/users/:user_id', function (req, res, next) {
	try {
		res.status(200).send({
			message: "partial",
			_links: endptsHlpr.getLinks('v1', 'users', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.delete('/users/:user_id', function (req, res, next) {
	try {
		res.status(200).send({
			message: "delete",
			_links: endptsHlpr.getLinks('v1', 'users', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.options('/users/:user_id', function (req, res, next) {
	try {
		res.status(200).send({
			message: "options",
			_links: endptsHlpr.getLinks('v1', 'users', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.options('/users', function (req, res, next) {
	try {
		res.status(200).send({
			message: "options",
			_links: endptsHlpr.getLinks('v1', 'users', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
module.exports = router;