/**
 * Created by williamagee on 8/28/15.
 */

(function() {
  'use strict';

  angular
    .module('web')
    .controller('StudentController', StudentController);

  /** @ngInject */
  function StudentController($state, $log, $mdDialog) {
    var vm = this;

    vm.openStudentDetails = function(student) {
      $log.info(student);
      $state.go('studentDetails', {id: student });
    };

    vm.addStudent = function(ev) {
      $mdDialog.show({
        controller: AddStudentController,
        templateUrl: './app/modals/addStudent.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };
  }


  function AddStudentController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

})();
