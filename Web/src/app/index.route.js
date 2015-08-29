(function() {
  'use strict';

  angular
    .module('web')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'MainController'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'LoginController'
      })

      .state('student', {
        url: '/student',
        templateUrl: 'app/student/student.html',
        controller: 'StudentController',
        controllerAs: 'StudentController'
      })

      .state('studentDetails', {
        url: '/student/:id',
        templateUrl: 'app/studentDetails/studentDetails.html',
        controller: 'StudentDetailsController',
        controllerAs: 'StudentDetailsController'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
