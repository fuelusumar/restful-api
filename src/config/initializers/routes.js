var winston = require('winston');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var environment = process.env.NODE_ENV || 'development';
var routes = require('../environments/' + environment + '/routes.json');
var versions = routes.versions;
var endpoints = [];
var default_actions = [
	{
		"method": "GET",
		"name": "list",
		"id": false
	}, {
		"method": "POST",
		"name": "create",
		"id": false
	}, {
		"method": "GET",
		"name": "retrieve",
		"id": true
	}, {
		"method": "PUT",
		"name": "update",
		"id": true
	}, {
		"method": "PATCH",
		"name": "partial",
		"id": true
	}, {
		"method": "DELETE",
		"name": "delete",
		"id": true
	}
];
/**
 * builds the route object
 *
 * @method getRoute
 *
 * @param  {[type]} action     CRUD action that this route executes
 * @param  {[type]} method     HTTP method for route
 * @param  {[type]} base       base url or start of route
 * @param  {[type]} controller controller that owns the action
 * @param  {[type]} id         specifies if the route uses id
 *
 * @return {[type]} route object
 */
var getRoute = function (action, method, base, controller, id) {
	var head = base + '/' + controller;
	var tail = id ? '/:' + id : '';
	var route = {
		'method': method,
		'href': head + tail,
		'rel': action
	};
	return route;
};
/**
 * [getVersionRoutes description]
 *
 * @method getVersionRoutes
 *
 * @param  {[type]}         version [description]
 *
 * @return {[type]}         [description]
 */
var getVersionRoutes = function (version) {
	var controllers = version.controllers;
	var base = '/' + version.name;
	endpoints[version.name] = [];
	for (var i = 0; i < controllers.length; i++) {
		getControllerRoutes(base, version, controllers[i]);
	}
};
/**
 * [getControllerRoutes description]
 *
 * @method getControllerRoutes
 *
 * @param  {[type]}            base       [description]
 * @param  {[type]}            version    [description]
 * @param  {[type]}            controller [description]
 *
 * @return {[type]}            [description]
 */
var getControllerRoutes = function (base, version, controller) {
	var controllers = controller.controllers || null;
	var actions = controller.actions || default_actions;
	endpoints[version.name][controller.name] = [];
	for (var i = 0; i < actions.length; i++) {
		var action = actions[i];
		endpoints[version.name][controller.name].push(getRoute(action.name, action.method, base, controller.name, action.id ? controller.id : null));
	}
	if (controllers && controllers.length > 0) {
		base += '/' + controller.name + '/:' + controller.id;
		for (var i = 0; i < controllers.length; i++) {
			getControllerRoutes(base, version, controllers[i])
		}
	}
};
/**
 * [initRoutes description]
 *
 * @method initRoutes
 *
 * @return {[type]}   [description]
 */
var initRoutes = function () {
	for (var i = 0; i < versions.length; i++) {
		getVersionRoutes(versions[i]);
	}
	global.endpoints = endpoints;
};
// action to take when events are emitted
eventEmitter.on('initRoutes', initRoutes);
// events emision
eventEmitter.emit('initRoutes');
process.on('uncaughtException', function (err) {
	winston.log('error', 'Error initialazing routes', err);
});