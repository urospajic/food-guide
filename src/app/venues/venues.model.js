(function() {
	'use strict';

	angular
		.module('backoffice')
		.factory('Venue', venueFactory);

	venueFactory.$inject = [];

	function venueFactory() {

		return Venue;
	}

	function Venue(data) {

		this.name = data && data.name ? data.name : '';
		this.address = data && data.vicinity ? data.vicinity : '';
		this.logo = data && data.logo ? data.logo : '';
		this.latitude = data &&  data.geometry.location.lat ? data.geometry.location.lat : 0;
		this.longitude = data && data.geometry.location.lng ? data.geometry.location.lng : 0;
		this.type = data && data.type ? data.type : '';
	}
})();