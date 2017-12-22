'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza')
  .controller('LogoutCtrl', function ($auth, $state) {
    $auth.logout()
    $state.go('main')
  });
