describe('oddNumber filter', function () {
  'use strict';

  var oddNumberFilter;

  describe(module('angularApp'));

  describe(inject(function($filter) {
    oddNumberFilter = $filter('oddNumber');
  }));

  describe('When call filter on array of digits', function () {
    var oddNumbers;
    beforeEach(function () {
      oddNumbers = oddNumberFilter([1,2,3,4,5])
    });
    it('Should return array with only odd number', function () {
      //expect(oddNumbers.length).toBe(3);
    });
  });
});
