/**
 * Created by williamagee on 8/28/15.
 */

(function() {
  'use strict';

  angular
    .module('web')
    .controller('StudentDetailsController', StudentDetailsController);

  /** @ngInject */
  function StudentDetailsController($state, $stateParams, $log, $mdSidenav, $mdUtil, $http, $mdDialog) {
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


    vm.addGuardian = function(ev) {
      $mdDialog.show({
        controller: AddGuardianController,
        controllerAs: 'AddGuardianController',
        templateUrl: './app/modals/addGuardian.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {

      }, function() {

      });
    };
  }


  function AddGuardianController($scope, $mdDialog, Upload) {
    var vm = this;

    vm.hide = function() {
      $mdDialog.hide();
    };
    vm.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

})();

