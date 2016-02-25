var express = require('express');
var router = express.Router();
var endptsHlpr = require('../../helpers/endpoints');
router.get('/users/:user_id/friends', function (req, res, next) {
	try {
		res.status(200).send({
			action: "list",
			_links: endptsHlpr.loadEnpoints('v1', 'friends').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.get('/users/:user_id/friends/:friend_id', function (req, res, next) {
	try {
		res.status(200).send({
			action: "retrieve",
			_links: endptsHlpr.loadEnpoints('v1', 'friends').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.post('/users/:user_id/friends', function (req, res, next) {
	try {
		res.status(200).send({
			action: "create",
			_links: endptsHlpr.loadEnpoints('v1', 'friends').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.put('/users/:user_id/friends/:friend_id', function (req, res, next) {
	try {
		res.status(200).send({
			action: "update",
			_links: endptsHlpr.loadEnpoints('v1', 'friends').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.patch('/users/:user_id/friends/:friend_id', function (req, res, next) {
	try {
		res.status(200).send({
			action: "partial",
			_links: endptsHlpr.loadEnpoints('v1', 'friends').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.delete('/users/:user_id/friends/:friend_id', function (req, res, next) {
	try {
		res.status(200).send({
			action: "delete",
			_links: endptsHlpr.loadEnpoints('v1', 'friends').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.options('/users/:user_id/friends/:friend_id', function (req, res, next) {
	try {
		res.status(200).send({
			action: "options",
			_links: endptsHlpr.loadEnpoints('v1', 'friends').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.options('/users/:user_id/friends', function (req, res, next) {
	try {
		res.status(200).send({
			action: "options",
			_links: endptsHlpr.loadEnpoints('v1', 'friends').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
		});
	} catch (err) {
		next(err);
	}
});
module.exports = router;