(function() {
  'use strict';
  
  angular
    .module('backoffice')
    .directive('pacConfirmAction', pacConfirmAction)
    .controller('ConfirmActionController', ConfirmActionController);

  pacConfirmAction.$inject = ['$uibModal'];
  function pacConfirmAction($uibModal) {
    return {
      link: link,
      restrict: 'A',
      scope: {
        action: '=pacConfirmAction',
      }
    };

    function link(scope, element, attrs) {
      element.on('click', function(e) {
        e.preventDefault();
        $uibModal.open({
          templateUrl: 'views/directives/pac.confirm.action.html',
          controller: 'ConfirmActionController',
          controllerAs: 'vm',
          backdrop: 'static',
          resolve: {
            action: function() {
              return scope.action;
            },
          },
        });
     });
    }
  }

  ConfirmActionController.$inject = ['$scope', 'action'];
  function ConfirmActionController($scope, action) {
    var vm = this;

    // public methods
    vm.applyAction = applyAction;
    vm.dismissModal = dismissModal;

    //////////////////////////////
    
    /**
     * Calls referenced action
     */
    function applyAction() {
      action();
      dismissModal();
    }

    /**
     * Dismisses modal instance
     */
    function dismissModal() {
      $scope.$dismiss();
    }
  }

})();
