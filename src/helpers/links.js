//console.dir(global);
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