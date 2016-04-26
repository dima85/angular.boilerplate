describe('Home Contoller', function() {
  'use strict';
	var scope;
	var controller;
  var simpleService;
	beforeEach(module('angularApp'));
	beforeEach(inject(function($controller, $rootScope, $injector) {
		scope = $rootScope.$new();
    simpleService = $injector.get('simpleService');
		controller = $controller('HomeController', {$scope: scope, simpleService: simpleService});
	}));


	describe('When initialize home controller', function() {
		it('Should set test variable to "test..."', function () {
			expect(scope.test).toEqual('test...');
		});
	});
});
