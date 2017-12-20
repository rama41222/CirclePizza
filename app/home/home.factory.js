(function(){
    'use strict'
    angular.module('app.home').factory('HomeFactory', homeFactory)

    function homeFactory(){
        return {
            sayHello: sayHello
        }
    }

    function sayHello(name){
        return 'Hello ' + name;
    }

})()