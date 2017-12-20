(function(){
    'use strict'
    angular.module('app.home').controller('HomeCtrl', Home)

    function Home($scope, HomeDataService, HomeFactory){
        //Data
        $scope.title = 'Circle Pizza'
        $scope.pizzas = HomeDataService.getAllPizzazOffers()
        $scope.message = HomeFactory.sayHello($scope.title)
    }

})()