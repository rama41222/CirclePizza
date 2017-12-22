'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:AccountsCtrl
 * @description
 * # AccountsCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza')
  .controller('AccountsCtrl', function ($scope, $http,toaster,$stateParams,API_URL, $state) {
    $http.get(API_URL+'balance').then(function (account) {
      $scope.accounts = account.data[0]
    }).catch(function (e) {
      toaster.pop('error', 'Error!', e.data.error);
    })

    $scope.navigate = function () {
     $state.go('cards')
    }
  });
