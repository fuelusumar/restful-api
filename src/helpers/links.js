/**
 * [getLinks description]
 *
 * @method getLinks
 *
 * @param  {[type]} url        API host protocol and domain
 * @param  {[type]} version    controller version
 * @param  {[type]} controller controller name
 * @param  {[type]} hypermedia if it should return hypermedia style
 * @param  {[type]} ids        id's object e.g. {user_id: 1}
 *
 * @return {[type]} options or link object
 */
exports.getLinks = function (url, version, controller, hypermedia, ids) {
	var _links = global.endpoints[version][controller];
	if (hypermedia) {
		for (var i = 0; i < _links.length; i++) {
			_links[i].href = url + _links[i].href;
			for (var key in ids) {
				_links[i].href = _links[i].href.replace(':' + key, ids[key]);
			}
		}
	}
	return _links;
};