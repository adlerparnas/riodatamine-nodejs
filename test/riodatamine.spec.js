describe("RioDataMine", function() {
	var riodatamine = require('../lib/riodatamine');

	it('Should require appId and appSecret to request data', function() {
		var fn  = function() {
			riodatamine.request(riodatamine.Services.AGUA.HIDROGRAFIA, {}, function(data) {
				console.log(data);
			});
		}

		expect(fn).toThrow();
	});

	it('Should set appID and appSecret on initialize', function() {
		var appId = '36492e906aa49878645df4252ed28a51',
			appSecret = 'zrlm3-ddp85-kbace';

	 	riodatamine.initialize( appId, appSecret );

	 	expect(riodatamine.getAppId()).toEqual(appId);
	 	expect(riodatamine.getAppSecret()).toEqual(appSecret);
	});

	it('Should authenticate before call the request', function() {
		var flag;

		runs(function() {
			riodatamine.request(riodatamine.Services.Agua.HIDROGRAFIA, {}, function() {});
		});

		waitsFor(function() {
			flag = riodatamine.isAuthenticated();
			return flag;
		}, 'The flag should be true', 10000);

		runs(function() {
			expect(flag).toBe(true);
		});

	});

	it('Should execute callback passing the result as arguments as array or object', function() {
		var flag = false;
		
		runs(function() {
			riodatamine.request(riodatamine.Services.Agua.HIDROGRAFIA, {}, function(result) {
				flag = (result && ((typeof result === "Array") || (typeof result === 'object')));
			});
		});

		waitsFor(function() {
			return flag;
		}, 'The flag should be true', 10000);

		runs(function() {
			expect(flag).toBe(true);
		});
	});
});