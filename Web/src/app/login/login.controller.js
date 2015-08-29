/**
 * Created by williamagee on 8/28/15.
 */

(function() {
  'use strict';

  angular
    .module('web')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, CheckInService) {
    var vm = this;

    vm.login = function() {
      CheckInService.login(vm.username, vm.password).then(function() {
        $state.go('home');
      });
    };
  }
})();
