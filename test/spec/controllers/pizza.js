'use strict';

describe('Controller: PizzaCtrl', function () {

  // load the controller's module
  beforeEach(module('justforfunApp'));

  var PizzaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PizzaCtrl = $controller('PizzaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PizzaCtrl.awesomeThings.length).toBe(3);
  });
});
