'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:CardCtrl
 * @description
 * # CardCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza').controller('CardCtrl', function ($scope, $http,toaster,$stateParams,API_URL, $state) {
  $scope.totalPrice = 0
  $http.get(API_URL+'ccs/'+ $stateParams.id).then(function (card) {
   // console.log(card)
    $scope.card = card.data[0]
  }).catch(function (e) {
    toaster.pop('error', 'Error!', e.data.error);
  })

  $http.get(API_URL+'balance').then(function (account) {
   // console.log(account)
    $scope.account = account.data[0]
  }).catch(function (e) {
    toaster.pop('error', 'Error!', e.data.error);
  })

  $scope.submit = function () {
    console.log($scope.totalPrice)
    if($scope.totalPrice == 0 || $scope.totalPrice == undefined  || $scope.totalPrice == null) {
      toaster.pop('error', 'Error', "Input a value higher than 0 /=");
    } else {
      $http.post(API_URL+'balance', { balance:$scope.totalPrice }).then(function (response) {
        console.log(response)
        toaster.pop('success', 'Success', "Successfully charged "+$scope.totalPrice+" /= from your " + $scope.card.name)
        $state.go('account')
      }).catch(function (e) {
        toaster.pop('error', 'Error', e.message);
      })
    }
  }

});
