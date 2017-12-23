'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza').controller('CheckoutCtrl', function ($stateParams, $http, API_URL, $state) {
  console.log($stateParams.id)
  console.log($stateParams.wid)
});
