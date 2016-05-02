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
		this.address = data && data.address ? data.address : '';
		this.logo = data && data.logo ? data.logo : '';
		this.latitude = data && data.latitude ? data.latitude : 0;
		this.longitude = data && data.longitude ? data.longitude : 0;
		this.type = data && data.type ? data.type : '';
	}
})();