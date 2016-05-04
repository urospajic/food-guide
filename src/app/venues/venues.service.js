(function() {
	'use strict';

	angular
		.module('backoffice')
		.service('venueService', venueService);

	venueService.$inject = ['$http', 'Venue'];

	function venueService($http, Venue) {

		var service = this;

		service.search = search;

		/////////////////////////////////////

		function search(latitude, longitude, radius) {

			// TODO: search venues by radius from specific geolocation
			// NOW: return all venues (this is DEMO app)
			return $http({

				method: 'get',
				
				//file 'myserver.json' calls google places webservice API, and returns JSON 
				url: 'http://localhost:3000/data'
				
			})
			.then(function (response) {
				
				var places = response.data.results;
				
				var result = [];

				for (var i in places) {

					result.push(new Venue(places[i]));
				}
				return result;
			},function (response){
				console.log(response);
			});
		}
	}
})();