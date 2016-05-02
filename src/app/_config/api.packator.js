(function() {
  'use strict';

  angular
    .module('backoffice')
    .service('packatorAPI', packatorApiProxy);

  packatorApiProxy.$inject = ['$http', 'config', '$rootScope'];
  function packatorApiProxy($http, config, $rootScope) {
    var service = this;

    // public methods
    service.http = submitRequest;

    /////////////////////////////////

    function submitRequest(request) {
      request.url = config.HOST + ensureSingleSlash(request.url);

      if (!request.params) {
        request.params = {};
      }

      if ($rootScope.user) {
        request.params.access_token = $rootScope.user.access_token;
      }
      
      return $http(request)
        .then(function(response) {
          return response.data;
        });
    }

    function ensureSingleSlash(str) {
      return  str.replace(/\/\//g, '/');
    }
  }

}());
