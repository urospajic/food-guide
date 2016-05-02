(function() {
  'use strict';

  angular
    .module('backoffice')
    .config(function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('app', {
          abstract: true,
          url: '/',
          templateUrl: 'views/layout/layout.html'
        })
        .state('app.map', {
          url: 'map',
          templateUrl: 'views/map/map.html'
        });

      $urlRouterProvider.otherwise('/map');

  });

})();
