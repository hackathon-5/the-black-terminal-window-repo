/**
 * Created by williamagee on 8/29/15.
 */

/**
 * Created by williamagee on 7/20/15.
 */
(function(undefined) {
  "use strict";

  var AuthInterceptor = angular.module('AuthInterceptor', []);

  AuthInterceptor.factory('AuthInterceptor',
    ['$q',
      "$rootScope",
      '$log',
      '$window',
      '$state',

      function($q, $rootScope, $log, $window, UserService, $state) {
        var interceptor = {},
          utils = {},
          isHTML = new RegExp('.html$', 'i');

        utils.redirectToLogin = function(status) {
          if(status === 401 || status === 403) {
            $window.sessionStorage.removeItem('checkin_tokens');
          }
          $state.go('login');
        };

        utils.getAuthTokens = function() {
          return JSON.parse($window.sessionStorage.getItem('checkin_tokens'));
        };

        //<editor-fold desc="REQUEST: Authorization Interceptor functions">

        interceptor.request = function(config) {
          // if the page is a templated html page then we don't need auth
          if(isHTML.exec(config.url) != null) {
            return config;
          }

          var _token = utils.getAuthTokens();

          //do auth stuff before we send the request
          if(_token === null) {
            return config;
          }

          if(config.needsAuthHeader !== false) {
            config.headers['Authorization'] = _token.access_token;
          }

          return config;
        };

        interceptor.requestError = function(rejection) {
          // Handle request errors
          switch(rejection.status) {
            case 401: // Unauth
              utils.redirectToLogin(rejection.status);
              console.log(rejection);
              break;
            case 403: // FORBIDDEN
              toastr.info(rejection.data.message);
              break;
            default:
              $log.debug([rejection.status, ': ', rejection.statusText || 'Request Error (possible CORS issues)', '\n', rejection.config.url].join(''));
              break;
          }

          return $q.reject(rejection);
        };

        //</editor-fold>

        //<editor-fold desc="RESPONSE: Handle Error Responses here">

        // optional method
        interceptor.response = function(response) {
          // do something on success
          $log.info(response);
          return response;
        };

        interceptor.responseError = function(rejection) {
          // Handle response errors
          switch(rejection.status) {
            case 401: // Unauth
              utils.redirectToLogin(rejection.status);
              break;
            case 403: // FORBIDDEN
              switch(rejection.data.type) {
                case "email_not_verified":
                  toastr.info(rejection.data.message);
                  break;
                case "authentication_failed":
                  utils.redirectToLogin(rejection.status);
                  break;
                default:
                  $log.debug(rejection.data);
                  break;
              };
              break;
            default:
              $log.debug([rejection.status, ': ', rejection.statusText || 'Request Error (possible CORS issues)', '\n', rejection.config.url].join(''));
              break;
          }

          return $q.reject(rejection);
        };

        //</editor-fold>
        //TODO: we may want to show errors for debugging here
        interceptor.displayErrorMsg = function() {

        };

        return interceptor;
      }
    ]
  );

  return AuthInterceptor;
})();
