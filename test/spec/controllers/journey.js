'use strict';

describe('Controller: JourneyCtrl', function () {

  // load the controller's module
  beforeEach(module('justforfunApp'));

  var JourneyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JourneyCtrl = $controller('JourneyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JourneyCtrl.awesomeThings.length).toBe(3);
  });
});
