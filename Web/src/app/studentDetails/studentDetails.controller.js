/**
 * Created by williamagee on 8/28/15.
 */

(function() {
  'use strict';

  angular
    .module('web')
    .controller('StudentDetailsController', StudentDetailsController);

  /** @ngInject */
  function StudentDetailsController($state, $stateParams, $log, $mdSidenav, $mdUtil, $http, $mdDialog, CheckInService, $firebaseArray) {
    var vm = this;

    updateView();

    vm.addGuardian = function(ev) {
      $mdDialog.show({
        controller: AddGuardianController,
        controllerAs: 'AddGuardianController',
        templateUrl: './app/modals/addGuardian.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(viewModel) {
          CheckInService.Student.addGuardian(vm.student.id, {
            image: viewModel.file[0].base64,
            first_name: viewModel.firstName,
            last_name: viewModel.lastName,
            relationship: viewModel.relationship || '',
            home_phone: viewModel.homePhone || '',
            mobile_phone: viewModel.mobilePhone || '',
            email: viewModel.email || '',
            address: viewModel.address || '',
            pick_up_times: (function(days) {
              var _days = [];
              for(var day in days) {
                if(days[day]) {
                  _days.push(day);
                }
              }

              return _days.join(' ');
            })(viewModel.pickup)
          }).then(function() {
            //you did it
            updateView();
          });
      }, function() {

      });
    };

    vm.viewGuardianDetails = function(guardian, evt) {

    };


    vm.updateGuardianStatus = function(guardian, evt) {
      $mdDialog.show({
        controller: EventController,
        controllerAs: 'EventController',
        templateUrl: './app/modals/addEvent.html',
        parent: angular.element(document.body),
        targetEvent: evt,
        clickOutsideToClose:true
      })
      .then(function(viewModel) {
        CheckInService.Student.event($stateParams.id, guardian.id, viewModel.closeReason).then(function() {

        });
      }, function() {

      });

    };


    function updateView() {
      CheckInService.Student.getById($stateParams.id).then(function(data, status) {
        vm.student = data;
      });

      CheckInService.Student.guardians($stateParams.id).then(function(data, status) {
        vm.guardians = data;
      });

      CheckInService.Student.events($stateParams.id).then(function() {

      });
    };

  }


  function AddGuardianController($scope, $mdDialog, Upload, $log) {
    var vm = this;

    vm.cancel = function() {
      $mdDialog.cancel();
    };
    vm.confirm = function() {
      $mdDialog.hide(vm);
    };
  }

  function EventController($scope, $mdDialog, Upload, $log) {
    var vm = this;

    vm.cancel = function() {
      $mdDialog.cancel();
    };
    vm.confirm = function() {
      $mdDialog.hide(vm);
    };
  }

})();

