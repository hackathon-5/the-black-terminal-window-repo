/**
 * Created by williamagee on 8/28/15.
 */

(function() {
  'use strict';

  angular
    .module('web')
    .controller('StudentDetailsController', StudentDetailsController);

  /** @ngInject */
  function StudentDetailsController($state, $stateParams, $log, $mdSidenav, $mdUtil, $http, $mdDialog, $firebaseArray) {
    var vm = this,
        guardians = $firebaseArray(new Firebase('https://checkin-hackathon5.firebaseio.com/guardians/' + $stateParams.id)),
        students = $firebaseArray(new Firebase('https://checkin-hackathon5.firebaseio.com/students'));

    vm.guardians = guardians;
    vm.students = students;


    students.$loaded(
      function() {
        vm.student = students.$getRecord($stateParams.id);
      }, function(error) {
        console.error("Error:", error);
      });
    //$http({
    //  url: 'https://randomuser.me/api/',
    //  dataType: 'json'
    //})
    //.success(function(data, status) {
    //    vm.student = data.results[0].user;
    //});

    vm.addGuardian = function(ev) {
      $mdDialog.show({
        controller: AddGuardianController,
        controllerAs: 'AddGuardianController',
        templateUrl: './app/modals/addGuardian.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(viewModal) {
          guardians.$add({
            image: viewModal.file || 'https://unsplash.it/200',
            first_name: viewModal.firstName,
            last_name: viewModal.lastName,
            relationship: viewModal.relationship,
            contact: viewModal.contactNumber
          }).then(function() {
            //you did it
            vm.guardians = guardians;
          });
      }, function() {

      });
    };

    vm.viewGuardianDetails = function(guardian, evt) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Navigating')
          .content('Inspect ' + guardian)
          .ariaLabel('Person inspect demo')
          .ok('Neat!')
          .targetEvent(event)
      );
    };


    vm.updateGuardianStatus = function(guardian, evt) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Navigating')
          .content('Inspect ' + guardian)
          .ariaLabel('Person inspect demo')
          .ok('Neat!')
          .targetEvent(event)
      );
    };

  }


  function AddGuardianController($scope, $mdDialog, Upload) {
    var vm = this;

    vm.upload = function(file) {
      $log.info(file);
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
    vm.confirm = function() {
      $mdDialog.hide(vm);
    };
  }

})();

