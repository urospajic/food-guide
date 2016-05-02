(function() {
  'use strict';

  angular
    .module('backoffice')
    .service('eventService', eventService);

  eventService.$inject = ['$q', '$rootScope', 'events'];

  function eventService($q, $rootScope, events) {

    var service = this;

    service.broadcast = broadcast;
    service.subscribe = subscribe;
    service.unsubscribe = unsubscribe;
    service.notifySuccess = notifySuccess;
    service.notifyError = notifyError;

    service.events = events;

    var unsubscribeTriggers = [];

    function broadcast(event, data) {

      return $q.when(function() {
        if (!!event) {
          if (event === events.ERROR || event === events.SUCCESS) {
            $rootScope.notificationActive = true;
          }

          return $rootScope.$broadcast(event, data);
        }
        return false;  
      }());
    }

    function subscribe(event, callback) {

      return $q.when(function() {
        var unsubscribeFunction = $rootScope.$on(event, callback);
        unsubscribeTriggers.push(unsubscribeFunction);
        return (unsubscribeTriggers.length - 1);
      }());      
    }

    function unsubscribe(index) {

      $q.when(function() {
        try {
          if (!!unsubscribeTriggers[index] && angular.isFunction(unsubscribeTriggers[index])) {

            unsubscribeTriggers[index]();
            unsubscribeTriggers.splice(index, 1);
          }
          return true;
        } catch(e) {

          return false;
        }  
      }());
    }

    /**
     * Broadcasts success event with message
     * @param  {string}   message     Success message
     * @return {void}
     */
    function notifySuccess(message) {
      broadcast(events.SUCCESS, message);
    }

    /**
     * Broadcasts error event with message
     * @param  {string}   message     Error message
     * @return {void}
     */
    function notifyError(message) {
      broadcast(events.ERROR, message);
    }
  }
}());