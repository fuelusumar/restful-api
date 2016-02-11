var express = require('express');
var router = express.Router();
var endptsHlpr = require('../../helpers/endpoints');
router.get('/users/:user_id/friends', function (req, res, next) {
	try {
		res.status(200).send({
			message: "list",
			_links: endptsHlpr.getLinks('v1', 'friends', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.get('/users/:user_id/friends/:friend_id', function (req, res, next) {
	try {
		res.status(200).send({
			message: "retrieve",
			_links: endptsHlpr.getLinks('v1', 'friends', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.post('/users/:user_id/friends', function (req, res, next) {
	try {
		res.status(200).send({
			message: "create",
			_links: endptsHlpr.getLinks('v1', 'friends', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.put('/users/:user_id/friends/:friend_id', function (req, res, next) {
	try {
		res.status(200).send({
			message: "update",
			_links: endptsHlpr.getLinks('v1', 'friends', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.patch('/users/:user_id/friends/:friend_id', function (req, res, next) {
	try {
		res.status(200).send({
			message: "partial",
			_links: endptsHlpr.getLinks('v1', 'friends', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.delete('/users/:user_id/friends/:friend_id', function (req, res, next) {
	try {
		res.status(200).send({
			message: "delete",
			_links: endptsHlpr.getLinks('v1', 'friends', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.options('/users/:user_id/friends/:friend_id', function (req, res, next) {
	try {
		res.status(200).send({
			message: "options",
			_links: endptsHlpr.getLinks('v1', 'friends', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
router.options('/users/:user_id/friends', function (req, res, next) {
	try {
		res.status(200).send({
			message: "options",
			_links: endptsHlpr.getLinks('v1', 'friends', true, req.headers.host, req.params)
		});
	} catch (err) {
		next(err);
	}
});
module.exports = router;