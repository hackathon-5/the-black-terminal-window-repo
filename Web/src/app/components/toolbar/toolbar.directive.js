(function() {
  'use strict';

  angular
    .module('web')
    .directive('materialToolbar', materialToolbar);

  /** @ngInject */
  function materialToolbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/toolbar/toolbar.html',
      scope: {
          creationDate: '='
      },
      controller: ToolbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ToolbarController(moment) {
      var vm = this;

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
