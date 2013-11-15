var riodatamine = require('../lib/riodatamine'),
	appId = '36492e906aa49878645df4252ed28a51',
	appSecret = 'zrlm3-ddp85-kbace';


riodatamine.initialize( appId, appSecret );

riodatamine.request(riodatamine.Services.Agua.HIDROGRAFIA, {}, function(data) {
	console.log(data);
});