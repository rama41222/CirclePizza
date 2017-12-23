'use strict';

/**
 * @ngdoc overview
 * @name justforfunApp
 * @description
 * # justforfunApp
 *
 * Main module of the application.
 */
angular.module('CirclePizza').config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL){
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('main',{
      url: '/',
      templateUrl:'/views/main.html',
      controller:'MainCtrl'
    })
    .state('register',{
      url: '/register',
      templateUrl:'/views/register.html',
      controller:'RegisterCtrl'
  }).state('logout', {
    url: '/logout',
    controller: 'LogoutCtrl'
  }).state('cards', {
    url: '/cards',
    templateUrl: '/views/topup.html',
    controller: 'TopUpCtrl',
      params: {
          pizza: null,
          locations: null,
      }
  }).state('login',{
    url: '/login',
    templateUrl:'/views/login.html',
    controller:'LoginCtrl'
  }).state('card',{
    url:'/card',
    templateUrl: '/views/card.html',
    controller : 'CardCtrl',
      params: {
          pizza: null,
          card: null,
          locations: null,
      }
  }).state('orders',{
    url:'/orders',
    templateUrl: '/views/orderhistory.html',
    controller : 'OrderHistoryCtrl'
  }).state('checkout', {
    url: '/card/:id/wrapper/:wid',
    templateUrl: '/views/checkout.html',
    controller: 'CheckoutCtrl'
  }).state('account', {
    url: '/accounts',
    templateUrl: '/views/accounts.html',
    controller: 'AccountsCtrl'
  }).state('journey', {
    url: '/journeys',
    templateUrl: '/views/journey.html',
    controller: 'JourneyCtrl'
  }).state('location', {
      url: '/locations',
      templateUrl: '/views/location.html',
      controller: 'LocationCtrl',
      params: {
          pizza: null,
      }
  }).state('pizza', {
      url: '/pizza',
      templateUrl: '/views/pizza.html',
      controller: 'PizzaCtrl',
      params: {
          pizza: null,
      }
  })


  $authProvider.google({
    clientId: '',
    url : API_URL + 'auth/google'
  })


  $authProvider.loginUrl = API_URL + 'login'
  $authProvider.signupUrl = API_URL + 'register'

  $authProvider.google({
    clientId: '791834574695-2qa67rdsq3354pe9vt572331auhsoqoi.apps.googleusercontent.com',
    redirectUri: window.location.origin,
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    requiredUrlParams:['scope'],
    url: API_URL + 'auth/google',
    scope: ['profile', 'email'],
    display: 'popup',
    oauthType: '2.0',
    popupOptions: { width: 452, height: 633 }
  });

  $authProvider.facebook({
    clientId: '1535547543206159',
    url: API_URL + 'auth/facebook',
  });

  $httpProvider.interceptors.push('authinterceptor')
})
  .constant('API_URL','http://localhost:9090/')
  .constant('MAPS_URL','https://maps.googleapis.com/maps/api/distancematrix/json?')
  .constant('MAPS_API_KEY', 'AIzaSyBFiFMYctrQLxIGDG4pkWqmfUli8F9aGEg')
  .run(function ($window) {
      var params = $window.location.search.substring(1)
      if(params && $window.opener &&  $window.opener.location.origin === $window.location.origin) {
        var pair  = params.split('=')
        var code = decodeURIComponent(pair[1])
        $window.opener.postMessage(code , $window.location.origin)
      }
  })
