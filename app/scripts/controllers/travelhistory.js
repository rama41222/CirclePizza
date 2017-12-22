'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza').controller('TravelHistoryCtrl', function ($scope, $http, API_URL, toaster) {

  $http.get(API_URL+'travels').then(function (travels) {
    $scope.travels = travels.data
  }).catch(function (e) {
    toaster.pop('error', 'Error!', e.data.error);
  })

  $scope.labels =  ['Kandy','Colombo','Galle','Kadawatha','Negambo','Nuwaraeliya','Matara']

  $scope.series = ['Ticket Expenditure']

  $scope.data = [2001,2212,3100,1000,550,600,1000];

  });
