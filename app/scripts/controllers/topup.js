'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza')
  .controller('TopUpCtrl', function($scope, $http, API_URL, toaster) {
    $http.get(API_URL+'ccs').then(function (creditcards) {
      $scope.creditcards = creditcards.data
    }).catch(function (e) {
      toaster.pop('error', 'Error!', e.data.error);
    })
  });
