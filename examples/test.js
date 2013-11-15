var riodatamine = require('../lib/riodatamine'),
	appId = 'APP_ID',
	appSecret = 'APP_SECRET';


riodatamine.initialize( appId, appSecret );

riodatamine.request(riodatamine.Services.Agua.HIDROGRAFIA, {}, function(data) {
	console.log(data);
});