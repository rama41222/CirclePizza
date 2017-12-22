'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza')
  .controller('MainCtrl', function ($scope, $state, $auth) {
    $scope.navigate = function () {

      if($auth.isAuthenticated()){
        $state.go('cards')
      }else {
        $state.go('login')
      }
    }

    $scope.pizzas = [
        {description:'Chicken bacon, onions & green chillies with a double layer of mozzarella cheese.',id:'1', name:'Chicken Bacon', image:'https://www.pizzahut.lk/Images/Product/Chicken%20Bacon.png', price:480.00 , type:'0'},
        {description:'Rich tomato sauce with a triple layer of mozzarella cheese.',id:'2', name:'Cheese Lovers', image:'https://www.pizzahut.lk/Images/Product/Cheese%20Lovers.png', price:222.00 , type:'0'},
        {description:'Devilled chicken in spicy sauce with a double layer of mozzarella cheese.',id:'3', name:'Devilled Chicken', image:'https://www.pizzahut.lk/Images/Product/Devilled%20Chicken.png', price:433.23 , type:'0'},
        {description:'Fresh tomato with a double layer of mozzarella cheese.',id:'4', name:'Cheese & Tomato', image:'https://www.pizzahut.lk/Images/Product/Cheese%20And%20Tomato.png', price:211.23 , type:'1'},
        {description:'Crispy onions with a double layer of mozzarella cheese.',id:'5', name:'Cheesy Onion', image:'https://www.pizzahut.lk/Images/Product/Cheesy%20Onion.png', price:233.23 , type:'1'},
        {description:'Chicken sausages & onions with a double layer of mozzarella cheese. ',id:'6', name:'Sausage Delight', image:'https://www.pizzahut.lk/Images/Product/Sausage%20Delight.png', price:234.23 , type:'0'},
        {description:'Capsicums, leeks, carrots, cabbage, pineapple and paneer with a double layer of mozzarella cheese.',id:'7', name:'Spicy Veggie with Paneer', image:'https://www.pizzahut.lk/Images/Product/Spicy%20Veggie%20with%20Paneer.png', price:345.23 , type:'1'},
        {description:'Tandoori chicken & onions with a double layer of mozzarella cheese. ',id:'8', name:'Tandoori Chicken', image:'https://www.pizzahut.lk/Images/Product/Tandoori%20Chicken.png', price: 345.23 , type:'1'}

    ]



  });
