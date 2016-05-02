(function() {
	'use strict';

	angular
		.module('backoffice')
		.controller('VenueModalController', venueModalController);

	venueModalController.$inject = ['$uibModalInstance', 'options'];

	function venueModalController($uibModalInstance, options) {

		var vm = this;

		vm.venue = options.venue;

		vm.close = close;

		////////////////////////////////////////

		function close() {

			if (options.onClose) {
				options.onClose(vm.venue);
			}
			$uibModalInstance.dismiss();
		}
	}
})();