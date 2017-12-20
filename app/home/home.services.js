(function(){
    'use strict'
    angular.module('app.home').service('HomeDataService',homeDataService)

    function homeDataService() {
        this.sayHello = sayHello
        this.getAllPizzazOffers = getAllPizzazOffers
    }

    function sayHello(name){
        return 'Hello ' + name;
    }

    function getAllPizzazOffers(){
        return [
            { name: 'Circle A', description:"" },
            { name: 'Circle B', description:"" },
            { name: 'Circle C', description:"" },
            { name: 'Circle D', description:"" },


        ]
    }
})()