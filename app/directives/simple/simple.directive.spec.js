describe('Simple directive tests', function() {
  'use strict';

  var scope;
  var parentScope;

  beforeEach(module('angularApp'));
  beforeEach(module('/directives/simple/simple.directive.tpl.html'));

  beforeEach(inject(function($rootScope, $compile) {
    parentScope = $rootScope.$new();
    parentScope.parentValue = 1;
    parentScope.action = function() {
    };
    var element = $compile('<simple-directive value="parentValue" text="" on-action="action()"></simple-directive>')(parentScope);
    parentScope.$digest();
    scope = element.isolateScope();
  }));

  describe('When call "click"', function() {
    beforeEach(function () {
      spyOn(parentScope, 'action');
      scope.click();
    });
    it('Should increase value by 1', function () {
      expect(scope.value).toBe(2);
    });
    it('Should call "action" from parent scope', function () {
      expect(parentScope.action).toHaveBeenCalled();
    });
  });
});
