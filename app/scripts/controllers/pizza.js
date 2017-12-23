'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:PizzaCtrl
 * @description
 * # PizzaCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza')
  .controller('PizzaCtrl', function ($scope, $state, $auth, $stateParams) {
      $scope.cart = []
      $scope.grandTotal = 0
      $scope.searchTerm = ""
      $scope.pizzas = [
          {qty:1 ,size:'S',description:'Chicken bacon, onions & green chillies with a double layer of mozzarella cheese.',id:'1', name:'Chicken Bacon', image:'https://www.pizzahut.lk/Images/Product/Chicken%20Bacon.png', price:480.00 , type:'1'},
          {qty:1 ,size:'S',description:'Rich tomato sauce with a triple layer of mozzarella cheese.',id:'2', name:'Cheese Lovers', image:'https://www.pizzahut.lk/Images/Product/Cheese%20Lovers.png', price:500.00 , type:'0'},
          {qty:1 ,size:'S',description:'Devilled chicken in spicy sauce with a double layer of mozzarella cheese.',id:'3', name:'Devilled Chicken', image:'https://www.pizzahut.lk/Images/Product/Devilled%20Chicken.png', price:433.23 , type:'1'},
          {qty:1 ,size:'S',description:'Fresh tomato with a double layer of mozzarella cheese.',id:'4', name:'Cheese & Tomato', image:'https://www.pizzahut.lk/Images/Product/Cheese%20And%20Tomato.png', price:511.00 , type:'0'},
          {qty:1 ,size:'S',description:'Crispy onions with a double layer of mozzarella cheese.',id:'5', name:'Cheesy Onion', image:'https://www.pizzahut.lk/Images/Product/Cheesy%20Onion.png', price:833.00 , type:'0'},
          {qty:1 ,size:'S',description:'Chicken sausages & onions with a double layer of mozzarella cheese. ',id:'6', name:'Sausage Delight', image:'https://www.pizzahut.lk/Images/Product/Sausage%20Delight.png', price:870.00 , type:'1'},
          {qty:1 ,size:'S',description:'Capsicums, leeks, carrots, cabbage, pineapple and paneer with a double layer of mozzarella cheese.',id:'7', name:'Spicy Veggie with Paneer', image:'https://www.pizzahut.lk/Images/Product/Spicy%20Veggie%20with%20Paneer.png', price:345.23 , type:'0'},
          {qty:1 ,size:'S',description:'Tandoori chicken & onions with a double layer of mozzarella cheese. ',id:'8', name:'Tandoori Chicken', image:'https://www.pizzahut.lk/Images/Product/Tandoori%20Chicken.png', price: 445.00 , type:'1'}

      ]
      $scope.tempprice = 0
      $scope.sizes = ['S','M','L']
      $scope.quantities =[1,2,3,4,5,6,7,8,9,10]
      $scope.selectedQty = 1
      $scope.selectedOption = $scope.sizes[1];
      $scope.multiplier = 1
      $scope.sizeChange = function (size) {
          switch (size){
              case 'S':
                 return 1
              case 'M':
                  return 2
              case 'L':
                  return 3
          }
      }

      $scope.addToCart= function(quantity,size,pizza){
          console.log(pizza)
          var mycart = {
              price: quantity*$scope.sizeChange(size)*pizza.price,
              quantity: quantity,
              size: $scope.sizeChange(size),
              pizza: pizza,
          }
          $scope.cart.push(mycart)
          console.log($scope.cart)
          $scope.getCartTotal()
      }
      
      $scope.getCartTotal = function () {
          $scope.grandTotal = 0
          $scope.cart.forEach(function(entry) {
              var price  = (entry.quantity * entry.size * entry.pizza.price) || 0
              $scope.grandTotal += price
          });
      }
      
      $scope.checkout = function () {
            var pizz = {
                price: $scope.grandTotal,
                qty:1,
                name:'Pizza Bundle',
            }

          if($auth.isAuthenticated()){
              $state.go('location', {pizza: pizz})
          }else {
              $state.go('login')
          }
      }

      $scope.removeItem = function (index) {
          var id = $scope.cart.indexOf(index)
          $scope.cart.splice(id, 1)
          $scope.getCartTotal()
      }
  });
