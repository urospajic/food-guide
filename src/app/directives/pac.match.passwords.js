(function() {
  'use strict';

  angular
    .module('backoffice')
    .directive('pacMatchPasswords', pacMatchPasswords);

  function pacMatchPasswords() {
    var errorProperty = 'match';

    return {
      link: link,
      restrict: 'A',
      require: 'ngModel'
    };

    function link(scope, element, attrs, ctrl) {
      scope.$watch(attrs.ngModel, function() {
        validate();
      });

      attrs.$observe('pacMatchPasswords', function(val) {
        validate();
      });

      function validate() {
        if (ctrl.$modelValue === attrs.pacMatchPasswords) {
          ctrl.$setValidity(errorProperty, true);
        }
        else {
          ctrl.$setValidity(errorProperty, false);
        }
      }
    }
  }

})();
