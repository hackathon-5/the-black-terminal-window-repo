/**
 * Created by williamagee on 8/28/15.
 */

(function() {
  'use strict';

  angular
    .module('web')
    .controller('StudentController', StudentController);

  /** @ngInject */
  function StudentController($state, $log, $mdDialog, $firebaseArray, CheckInService) {
    var vm = this,
        _list = $firebaseArray(new Firebase('https://checkin-hackathon5.firebaseio.com/students'));

    vm.list = _list;

    CheckInService.Student.list().then(function(data, status) {
      $log.info(arguments);
    });

    vm.openStudentDetails = function(student) {
      $log.info(student);
      $state.go('studentDetails', {id: student });
    };

    vm.addStudent = function(ev) {
      $mdDialog.show({
        controller: AddStudentController,
        controllerAs: 'AddStudentController',
        templateUrl: './app/modals/addStudent.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(viewModel) {
          CheckInService.Student.new({
            image: 'https://unsplash.it/300',
            first_name: viewModel.firstName,
            last_name: viewModel.lastName,
            grade: viewModel.grade,
            address: viewModel.address,
            dob: viewModel.dob
          })
          .then(function(data, status) {
            $log.info(arguments);
          });

      }, function() {

      });
    };
  }

  function AddStudentController($scope, $mdDialog) {
    var vm = this;

    vm.cancel = function() {
      $mdDialog.cancel();
    };
    vm.confirm = function() {
      $mdDialog.hide(vm);
    };
  }

})();
