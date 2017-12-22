'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza')
  .controller('MainCtrl', function ($scope, $state, $auth) {
    $scope.navigate = function () {

      if($auth.isAuthenticated()){
        $state.go('cards')
      }else {
        $state.go('login')
      }
    }
  });
