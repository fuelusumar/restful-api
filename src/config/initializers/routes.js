var environment = process.env.NODE_ENV || 'development';
var routes = require('../environments/' + environment + '/routes.json');
var versions = routes.versions;
var links = [];
var getLink = function (action, method, base, controller, id) {
	var head = base + '/' + controller;
	var tail = id ? '/:' + id : '';
	var link = {
		'method': method,
		'href': head + tail,
		'rel': action
	};
	return link;
};
var getVersionActions = function () {
	return [{
		'method': 'OPTIONS',
		'action': 'links',
		'id': false
	}];
};
var getVersionRoutes = function (version) {
	var controllers = version.controllers;
	var base = '/' + version.name;
	var actions = getVersionActions();
	links[version.name] = [];
	for (var i = 0; i < controllers.length; i++) {
		getControllerRoutes(base, version, controllers[i]);
	}
};
var getControllerActions = function () {
	return [{
		'method': 'GET',
		'name': 'list',
		'id': false
	}, {
		'method': 'POST',
		'name': 'create',
		'id': false
	}, {
		'method': 'GET',
		'name': 'retrieve',
		'id': true
	}, {
		'method': 'PUT',
		'name': 'update',
		'id': true
	}, {
		'method': 'PATCH',
		'name': 'partial',
		'id': true
	}, {
		'method': 'DELETE',
		'name': 'delete',
		'id': true
	}];
};
var getControllerRoutes = function (base, version, controller) {
	var controllers = controller.controllers || null;
	var actions = getControllerActions();
	links[version.name][controller.name] = [];
	for (var i = 0; i < actions.length; i++) {
		var action = actions[i];
		links[version.name][controller.name].push(getLink(action.name, action.method, base, controller.name, action.id ? controller.id : null));
	}
	if (controllers && controllers.length > 0) {
		base += '/' + controller.name + '/:' + controller.id;
		for (var i = 0; i < controllers.length; i++) {
			getControllerRoutes(base, version, controllers[i])
		}
	}
};
var initRoutes = function () {
	for (var i = 0; i < versions.length; i++) {
		getVersionRoutes(versions[i]);
	}
	global.links = links;
};
initRoutes();
//console.dir(global);
console.dir(global.links);
/*function Routes(url) {
	initRoutes();
	this.links = links;
	this.url = url;
	//console.dir(links);
}
Routes.prototype.getLinks = function (version, controller, hypermedia, ids) {
	if (hypermedia) {
		var _links = this.links[version][controller];
		for (var i = 0; i < _links.length; i++) {
			_links[i].href = this.url + _links[i].href;
			for (var key in ids) {
				_links[i].href = _links[i].href.replace(':' + key, ids[key]);
			}
		}
		return _links;
	}
	return this.links[version][controller];
};
var rt = new Routes('hello');
console.dir(rt.getLinks('v1', 'friends', true, {
	'user_id': '1',
	frjhgiend_id: 2
}));*/
// export the class
//module.exports = Routes;