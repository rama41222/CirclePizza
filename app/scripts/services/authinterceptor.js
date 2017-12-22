'use strict';

/**
 * @ngdoc service
 * @name justforfunApp.authinterceptor
 * @description
 * # authinterceptor
 * Factory in the justforfunApp.
 */
angular.module('CirclePizza').factory('authinterceptor', function (authToken) {

    return {
      request: function (config) {
        var token = authToken.getToken();
        if(token) {
          config.headers.Authorization = 'JWT '+ token;
        }

        return config
      },
      response: function (response) {
        return response
      }
    };
  });
