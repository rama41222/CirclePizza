'use strict';

describe('Service: authinterceptor', function () {

  // load the service's module
  beforeEach(module('justforfunApp'));

  // instantiate service
  var authinterceptor;
  beforeEach(inject(function (_authinterceptor_) {
    authinterceptor = _authinterceptor_;
  }));

  it('should do something', function () {
    expect(!!authinterceptor).toBe(true);
  });

});
