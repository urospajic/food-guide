(function() {
  'use strict';

  angular
    .module('backoffice')
    .service('countriesAPI', countriesAPI);

  countriesAPI.$inject = ['$q', '$http', 'config'];
  function countriesAPI($q, $http, config) {
    var service = this;

    // public methods
    service.getCountries = getCountries;

    // variables and properties
    var _allCountries;

    /////////////////////////////////

    function getCountries() {
      // serve from memory
      if (!!_allCountries && !!_allCountries.length) {
        return $q.when(function() {
          return _allCountries;
        }());
      }

      // call API, save results in memory
      return $http({
        method: config.httpMethods.GET,
        url: config.COUNTRIES,
      })
      .then(function(response) {
        _allCountries = response.data;
        return _allCountries;
      });
    }
  }

}());
