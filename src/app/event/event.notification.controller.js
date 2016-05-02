(function() {
  'use strict';

  angular
    .module('backoffice')
    .controller('EventNotificationController', EventNotificationController);

  EventNotificationController.$inject = ['$q', '$timeout', '$rootScope', 'eventService', 'events'];

  function EventNotificationController($q, $timeout, $rootScope, eventService, events) {
    var vm = this;

    // public methods
    vm.removeNotification = removeNotification;

    // variables and properties
    vm.message = {};

    activate();

    ////////////////////////////////////////////////

    function activate() {

      eventService.subscribe(events.SUCCESS, function (event, message) {
        populateVM(event.name, message)
          .then(removeNotificationDelayed);
      });

      eventService.subscribe(events.ERROR, function (event, message) {
        populateVM(event.name, message)
          .then(removeNotificationDelayed);
      });
    }

    ////////////////////////////////////////////////
    
    /**
     * Populates videmodel data with appropriate type and message
     * @param  {string}   type      error/success
     * @param  {string}   message   Message to be shown to User
     * @return {void}
     */
    function populateVM(type, message) {
      return $q.when((function() {
        vm.message.type = type;
        vm.message.contents = message;
      })());
    }

    /**
     * Resets notification object, thus removing the notification from UI
     * @return {void}
     */
    function removeNotification() {
      vm.message = {};
      $rootScope.notificationActive = false;
    }

    /**
     * Removes notification after X seconfs
     * @return {void}
     */
    function removeNotificationDelayed() {
      $timeout(removeNotification, events.notificationDisplayTime);
    }
  }

})();
