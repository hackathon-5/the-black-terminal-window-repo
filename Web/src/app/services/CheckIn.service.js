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


        service.Student = {
          // Good
          new: function(newStudent) {
            var _deferred = $q.defer();
            var _data = angular.extend({
              'first_name': '',
              'last_name': '',
              'grade': null,
              'address': '',
              'image': '',
              'dob': ''
            }, newStudent);

            $http({
              url: [_base, '/student/new'].join(''),
              method: 'POST',
              responseType: 'json',
              data: _data
            })
            .success(function(data, status) {
              _deferred.resolve(data, status);
            })
            .error(function(data, status) {
              _deferred.reject(data, status);
            });

            return _deferred.promise;
          },

          // Good
          list: function() {
            var _deferred = $q.defer();

            $http({
              url: [_base, '/student/list'].join(''),
              method: 'GET',
              responseType: 'json'
            })
              .success(function(data, status) {
                _deferred.resolve(data, status);
              })
              .error(function(data, status) {
                _deferred.reject(data, status);
              });

            return _deferred.promise;
          },

          getById: function(student_id) {
            var _deferred = $q.defer();

            $http({
              url: [_base, '/student/', student_id].join(''),
              method: 'GET',
              responseType: 'json'
            })
              .success(function(data, status) {
                _deferred.resolve(data, status);
              })
              .error(function(data, status) {
                _deferred.reject(data, status);
              });

            return _deferred.promise;
          },
          guardians: function(student_id) {
            var _deferred = $q.defer();

            $http({
              url: [_base, '/student/', student_id, '/guardians'].join(''),
              method: 'GET',
              responseType: 'json'
            })
              .success(function(data, status) {
                _deferred.resolve(data, status);
              })
              .error(function(data, status) {
                _deferred.reject(data, status);
              });

            return _deferred.promise;
          },
          guardianBlacklist: function() {
            var _deferred = $q.defer();

            $http({
              url: [_base, '/student/', student_id, '/guardians/blacklisted'].join(''),
              method: 'GET',
              responseType: 'json'
            })
              .success(function(data, status) {
                _deferred.resolve(data, status);
              })
              .error(function(data, status) {
                _deferred.reject(data, status);
              });

            return _deferred.promise;
          }

        };

        return service;
      }
    ]
  );

  return CheckInService;
})();
