riodatamine-nodejs
==================

It's a Node.js module to consume data form RioDataMine services


How to use
==========

	var riodatamine = require('riodatamine'),
	    appID = "MY_APP_ID",
	    appSecret = "MY_APP_SECRET",
	    options;
	    
	riodatamine = riodatamine.initialize(appID, appSecret);
	
	options = {
	  search: 'Teatro'
	}
	
	riodatamine.request(riodatamine.services.VisitarRio.O_QUE_FAZER, options, function(response) {
		console.log(response);
	});


Available options
-----------------

The available options are the same of RioDataMine API decribed in this link

http://riodatamine.com.br/#/api/?/scrollTo/argumentos-filtro-servicos

Contact
===========

- email: eu@adlerparnas.com
- skype: adler.parnas
- g+: adler.parnas
