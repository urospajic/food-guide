(function () {
  'use strict';
  
  angular
    .module('backoffice')
    .run(stateChangeEvents);

  stateChangeEvents.$inject = ['$window', '$rootScope', '$state'];
  function stateChangeEvents($window, $rootScope, $state, authService) {

    /*function onStateChangeStart(event, toState, toParams, fromState) {
      if (!authService.isUserLoggedIn() && toState.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }

      if (authService.isUserLoggedIn() && (toState.name === 'app' || toState.name === 'login')) {
        event.preventDefault();
        $state.go('app.orders');
      }
    }

    $rootScope.$on('$stateChangeStart', onStateChangeStart);*/
  }

})();
