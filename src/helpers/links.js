/**
 * [getLinks description]
 *
 * @method getLinks
 *
 * @param  {[type]} version    controller version
 * @param  {[type]} controller controller name
 * @param  {[type]} hypermedia if it should return hypermedia style
 * @param  {[type]} url        API host protocol and domain
 * @param  {[type]} ids        id's object e.g. {user_id: 1}
 *
 * @return {[type]} options or link object
 */
exports.getLinks = function (version, controller, hypermedia, url, ids) {
	var _links = global.endpoints[version][controller];
	if (hypermedia && url) {
		var _hypers = [];
		for (var i = 0; i < _links.length; i++) {
			var _link = {};
			_link.method = _links[i].method;
			_link.href = url + _links[i].href;
			_link.rel = _links[i].rel;
			for (var key in ids) {
				_link.href = _link.href.replace(':' + key, ids[key]);
			}
			_hypers.push(_link);
		}
		return _hypers;
	}
	return _links;
};