/**
 * Created by williamagee on 8/28/15.
 */

(function() {
  'use strict';

  angular
    .module('web')
    .controller('StudentController', StudentController);

  /** @ngInject */
  function StudentController($state, $log, $mdDialog, $firebaseArray) {
    var vm = this,
        _list = $firebaseArray(new Firebase('https://checkin-hackathon5.firebaseio.com/students'));

    vm.list = _list;

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
      .then(function(answer) {
          _list.$add({
            image: 'https://unsplash.it/300',
            first_name: answer.firstName,
            last_name: answer.lastName,
            grade: answer.grade,
            address: answer.address
          }).then(function() {
            //you did it
            vm.list = _list;
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
