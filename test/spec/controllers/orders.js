'use strict';

describe('Controller: OrdersCtrl', function () {

  // load the controller's module
  beforeEach(module('justforfunApp'));

  var OrdersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrdersCtrl = $controller('OrdersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrdersCtrl.awesomeThings.length).toBe(3);
  });
});
