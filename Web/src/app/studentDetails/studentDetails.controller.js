/**
 * Created by williamagee on 8/28/15.
 */

(function() {
  'use strict';

  angular
    .module('web')
    .controller('StudentDetailsController', StudentDetailsController);

  /** @ngInject */
  function StudentDetailsController($state, $stateParams, $log, $mdSidenav, $mdUtil, $http) {
    var vm = this;

    $log.info($stateParams.id);

    vm.toggleLeft = buildToggler('left');
    vm.toggleRight = buildToggler('right');

    vm.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      },200);
      return debounceFn;
    }


    $http({
      url: 'https://randomuser.me/api/',
      dataType: 'json'
    })
    .success(function(data, status) {
        vm.student = data.results[0].user;
    });
  }
})();

