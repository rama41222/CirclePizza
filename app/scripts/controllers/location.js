'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:LocationCtrl
 * @description
 * # LocationCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza')
  .controller('LocationCtrl', function ($scope, $state, $auth, $stateParams, toaster) {
        
      $scope.location = {}
      $scope.districts = ['Gampaha','Badulla', 'Colombo', 'Matara', 'Kandy', 'Galle']
      $scope.submit = function () {
          if($scope.location.city && $scope.location.address && $scope.location.district) {
              $state.go('cards',{ pizza: $stateParams.pizza, locations: $scope.location})

              console.log('okkkkk')
          } else {
              toaster.pop('error', 'Error!', 'Validation Failed');
          }
      }
      
      $scope.imgcl = function () {
          $scope.location = {
              city: 'Kadawatha',
              disctrict: 'Gampaha',
              address: 'No 233/A'
          }
          $state.go('cards',{ pizza: $stateParams.pizza, locations: $scope.location})


      }
  });
