/**
 * Created by williamagee on 8/28/15.
 */

(function() {
  'use strict';

  angular
    .module('web')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state) {
    var vm = this;

    vm.login = function() {
      console.log(vm.name, vm.password);
      $state.go('home');
    };
  }
})();
