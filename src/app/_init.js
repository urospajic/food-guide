(function() {
  'use strict';

  angular
    .module('backoffice', [
      'ui.router',
      'ui.bootstrap',
      'ngMap'
    ])
    .constant('config', {})
    .run(setupConfig);

  function setupConfig($http, config) {
    $http({
      method: 'GET',
      url: 'data/config.json'
    })
    .then(function(res) {
      angular.extend(config, res.data);
    });
  }

})();
