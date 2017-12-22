'use strict';

describe('Directive: sameas', function () {

  // load the directive's module
  beforeEach(module('justforfunApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sameas></sameas>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the sameas directive');
  }));
});
