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
            _base = 'http://studentguardian.52-apps.com:9000';

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
          addGuardian: function(student_id, newGuardian) {
            var _deferred = $q.defer();

            $http({
              url: [_base, '/student/', student_id, '/guardian'].join(''),
              method: 'POST',
              responseType: 'json',
              data: newGuardian
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
          },
          event: function(student_id, guardian_id, reason) {
            var _deferred = $q.defer();

            $http({
              url: [_base, '/student/event'].join(''),
              method: 'Post',
              responseType: 'json',
              data: {
                'student_id': student_id,
                'guardian_id': guardian_id,
                'reason': reason
              }
            })
            .success(function(data, status) {
              _deferred.resolve(data, status);
            })
            .error(function(data, status) {
              _deferred.reject(data, status);
            });

            return _deferred.promise;
          },
          events: function(student_id) {
            var _deferred = $q.defer();

            $http({
              url: [_base, '/student/', student_id, '/events'].join(''),
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
