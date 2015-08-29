/**
 * Created by williamagee on 8/28/15.
 */

(function() {
  'use strict';

  angular
    .module('web')
    .controller('StudentController', StudentController);

  /** @ngInject */
  function StudentController($state, $log) {
    var vm = this;

    vm.openStudentDetails = function(student) {
      $log.info(student);
      $state.go('studentDetails', {id: student });
    };
  }
})();
