'use strict';

/**
 * @ngdoc service
 * @name justforfunApp.auth
 * @description
 * # auth
 * Service in the justforfunApp.
 */
angular.module('CirclePizza').service('auth', function (API_URL, authToken, $http, $state, $window, $q, toaster) {
  //   var url = API_URL+'login'
  //   this.login = function (email, password) {
  //     return $http.post(url, { email:email, password: password })
  //   }
  //
  // this.register = function (email, password) {
  //   return $http.post(API_URL+'register', { email:email, password: password })
  // }
  //
  // var urlBuilder = []
  // var clientId = '791834574695-2qa67rdsq3354pe9vt572331auhsoqoi.apps.googleusercontent.com'
  // urlBuilder.push('response_type=code',
  //   'client_id=' + clientId,
  //   'redirect_uri='+window.location.origin,
  //   'scope=profile email '
  //
  // )
  //
  // this.googleAuth = function () {
  //     var url = "https://accounts.google.com/o/oauth2/v2/auth?"+ urlBuilder.join('&')
  //     var options = "width=500, height=500,left="+($window.outerWidth - 500) /2 + ",top=" +($window.outerHeight - 500)/2.5
  //   var deffered = $q.defer()
  //
  //   var popup = $window.open(url, '', options)
  //   $window.focus()
  //   $window.addEventListener('message', function (event) {
  //     if(event.origin === $window.location.origin) {
  //       popup.close()
  //       var code = event.data
  //       $http.post(API_URL+'auth/google', {
  //         code: code,
  //         client_id: clientId,
  //         redirect_uri:window.location.origin,
  //
  //       }).then(function (response) {
  //         console.log(response)
  //         deffered.resolve(response)
  //       }).catch(function (error) {
  //         console.log(error)
  //         toaster.pop('error', error.statusText, error.data.message);
  //       })
  //     }
  //   })
  //   return deffered.promise
  // }

  });
