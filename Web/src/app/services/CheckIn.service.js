/**
 * Created by williamagee on 8/29/15.
 */
(function(undefined) {
  "use strict";

  var CheckInService = angular.module('CheckInService', []);

  CheckInService.factory('CheckInService',
    [
      '$http',
      '$q',

      function($http, $q) {
        var service = {},
            _base = 'http://52.3.105.93:9000';

        service.login = function(username, password) {
          var _deferred = $q.defer();

          $http({
            url: [_base, '/login/'].join(''),
            method: 'POST',
            responseType: 'json',
            needsAuthHeader: false,
            data: {
              'username': username,
              'password': password
            }
          })
          .success(function(data, status) {
            _deferred.resolve(data, status);
          })
          .error(function(data, status) {
            _deferred.reject(data, status);
          });

          return _deferred.promise;
        };


        return service;
      }
    ]
  );

  return CheckInService;
})();
