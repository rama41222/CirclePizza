'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza').controller('HeaderCtrl', function ($scope,$auth) {
    $scope.isAuthenticated = $auth.isAuthenticated;
  });
