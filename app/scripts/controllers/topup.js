'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza')
  .controller('TopUpCtrl', function($scope, $auth, $state, $http, API_URL, toaster, $stateParams) {
    $http.get(API_URL+'ccs').then(function (creditcards) {
      $scope.creditcards = creditcards.data
    }).catch(function (e) {
      toaster.pop('error', 'Error!', e.data.error);
    })

      $scope.navigate = function (pizza, card) {

          if($auth.isAuthenticated()){
              $state.go('card', {pizza: pizza, card: card})
          }else {
              $state.go('login')
          }
      }
      $scope.pizza  = $stateParams.pizza
      console.log($scope.pizza)
  });
