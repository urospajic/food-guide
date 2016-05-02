(function() {
  'use strict';

  angular
    .module('backoffice')
    .constant('events', {
      SESSION_EXPIRED: 'SESSION_EXPIRED',
      USER_LOGGED_IN: 'USER_LOGGED_IN',
      USER_LOGGED_OUT: 'USER_LOGGED_OUT',
      ERROR: 'ERROR',
      SUCCESS: 'SUCCESS',
      notificationDisplayTime: 6000,
    });
}());