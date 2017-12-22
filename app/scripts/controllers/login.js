'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza').controller('LoginCtrl', function ($scope ,toaster, $state, $auth) {
  $scope.submit = function () {
    $auth.login({email:$scope.email, password:$scope.password}).then(function (response) {
      toaster.pop('success', 'Welcome!', 'How are you today, '+ response.data.user.email + '?');
      $state.go('cards')
    }).catch(handleError)
  }

  $scope.authenticate = function (provider) {
    $auth.authenticate(provider).then(function (res) {
      toaster.pop('success', 'Welcome!', 'How are you today '+ res.data.user.displayName +'?');
      $state.go('cards')
    }).catch(handleError)

  }
  function  handleError(err) {
    toaster.pop('error', 'Something Wrong! ', err.message);
  }

});

