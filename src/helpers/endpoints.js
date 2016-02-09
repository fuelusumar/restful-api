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
 * @return {[type]} options or endpoint object
 */
exports.getLinks = function (version, controller, hypermedia, url, ids) {
	var _endpoints = global.endpoints[version][controller];
	if (hypermedia && url) {
		var _hypers = [];
		for (var i = 0; i < _endpoints.length; i++) {
			var _endpoint = {};
			_endpoint.method = _endpoints[i].method;
			_endpoint.href = url + _endpoints[i].href;
			_endpoint.rel = _endpoints[i].rel;
			for (var key in ids) {
				_endpoint.href = _endpoint.href.replace(':' + key, ids[key]);
			}
			_hypers.push(_endpoint);
		}
		return _hypers;
	}
	return _endpoints;
};