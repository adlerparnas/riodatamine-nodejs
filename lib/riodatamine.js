var http = require('http'),
	util = require('util'),
	querystring = require('querystring');


/* Private attributes */
var _hostname         = 'api.riodatamine.com.br';
var _baseServicesPath = '/rest';
var _accessToken      = null;
var _accessToken      = null;
var _appId            = null;
var _appSecret        = null;

var _isAuthenticated = function() {
	var now;

	if (_accessToken) {
		now = new Date();

		return (_accessToken.expires < now);
	}

	return false;
};


/* Private Methods */

var _requestToken = function(_callback) {
	var options, request;

	if (_isAuthenticated()) {
		return _callback(_accessToken);
	}
	

	if (!_appId || !_appSecret) {
		throw "APP_ID and APP_SECRET missing";
	}

	options = {
		hostname: _hostname,
		path: '/rest/request-token?' + querystring.stringify({'app-id': _appId, 'app-secret': _appSecret}),
		port: 80,
		method: 'GET'
	};

	try {
		http.get(options, function(response) {

			if (response.statusCode !== 200) {
				throw "RioDataMine not responding";
			}

			_accessToken = {
				expires: new Date(parseInt(response.headers['x-access-token-expires'])),
				token: response.headers['x-access-token']
			};

			_callback(this._accessToken);
		}).on('error', function(err) {
			util.error(err);
		});
	} catch (err) {
		util.error('RioDatamine exception' + err);
	}
};

exports.initialize = function(appId, appSecret) {
	_appId     = appId;
	_appSecret = appSecret;
};

exports.request = function(method, params, _callback) {
	var me = this;

	_requestToken(function(accessToken) {
		params = params || {};
		params.format = params.format || 'json';

		var options = {
			hostname : _hostname,
			path:      _baseServicesPath + method + '?' + querystring.stringify(params),
			headers: { Authorization : _accessToken.token }
		};

		http.get(options, function(response) {
			var result = '';
			response.setEncoding('utf8');
			response.on('data', function(data) {
				result += data.toString();
			}).on('end', function() {
				try {
					result = (params.format === 'json') ? JSON.parse(result) : result;
					_callback(result);
				} catch(err) {
					_callback({error: err});
				}
			});
		});
	});
};

exports.getAppId = function() { return _appId; }
exports.getAppSecret = function() { return _appSecret; }
exports.isAuthenticated = _isAuthenticated;


/* constants */
exports.Services = {
	Agua: {
		PONTOS_DE_ALAGAMENTO: '/agua/pontos-alagamento',
		HIDROGRAFIA: '/agua/rios'
	},
	Demografia: {
		BAIRROS: '/demografia/bairros',
		FAVELAS: '/demografia/favelas',
		MAPA_DE_SUSCETIBILIDADE: '/demografia/mapa-suscetibilidade'
	},
	Infraestruturas: {
		CORPOS_DE_BOMBEIROS:  '/infraestruturas/corpos-bombeiros',
		DELEGACIAS_POLICIAIS: '/infraestruturas/delegacias-policiais',
		ESCOLAS:              '/infraestruturas/escolas',
		UNIDADES_DE_SAUDE:    '/infraestruturas/unidades-saude',
		BANHEIROS_CEMUSA:     '/infraestruturas/banheiros-cemusa',
		JOGOS_OLIMPICOS:      '/infraestruturas/jogos-olimpicos'
	},
	VisitarRio : {
		ESCOLAS_DE_SAMBA: '/visitar-rio/escolas-de-samba',
		ESPORTES:         '/visitar-rio/esportes',
		ESPORTES_AGUA:    '/visitar-rio/esportes/agua',
		ESPORTES_AR:      '/visitar-rio/esportes/ar',
		ESPORTES_TERRA:   '/visitar-rio/esportes/terra',
		ONDE_COMER:       '/visitar-rio/onde-comer',
		O_QUE_FAZER:      '/visitar-rio/o-que-fazer',
		PRAIAS:           '/visitar-rio/praias'          
	}
};