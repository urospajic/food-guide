(function() {
  'use strict';

  angular
    .module('backoffice')
    .directive('pacEnter', pacEnter);

  function pacEnter() {
    return {
      link: link,
      restrict: 'A',
      scope: {
        pacEnter: '='
      }
    };
  }

  function link(scope, element, attrs) {
    element.on("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.pacEnter();
        event.preventDefault();
      }
    });
  }

}());
