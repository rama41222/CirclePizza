'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza').controller('RegisterCtrl', function ($scope,toaster, $auth, $state) {
    $scope.submit = function () {
      $auth.signup({email: $scope.email, password: $scope.password}).then(function (response) {
        $auth.setToken(response);
        toaster.pop('success', 'Account Created!', 'Welcome '+ response.data.user.email + '!')
        $state.go('main')
      }).catch(function (e) {
        toaster.pop('error', 'Error', e.message);
      })
    }
  });
