describe('Home Contoller', function() {
  'use strict';
	var scope;
	var controller;
	beforeEach(module('angularApp'));
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('HomeController', {$scope: scope});
	}));


	describe('When initialize home controller', function() {
		it('Should set test variable to "test..."', function () {
			expect(scope.test).toEqual('test...');
		});
	});
});
