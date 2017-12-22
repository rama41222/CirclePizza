'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza').controller('OrderHistoryCtrl', function ($scope, $http, API_URL, toaster) {

  $http.get(API_URL+'travels').then(function (travels) {
    $scope.orders = travels.data
  }).catch(function (e) {
    toaster.pop('error', 'Error!', e.data.error);
  })

  $scope.labels =  ['Gampaha','Colombo','Galle','Matara','Badulla']

  $scope.series = ['Expenditure']

  $scope.data = [4700,8000,700,550,550,600,1000];

  });
