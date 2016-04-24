(function(angular) {
	'use strict';

  angular
    .module('angularApp')
    .directive('simpleDirective', simpleDirective);

  simpleDirective.$inject = [];

  function simpleDirective() {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        value: '=',
        text: '@',
        onAction: '&'
      },
      templateUrl: '/directives/simple/simple.directive.tpl.html',
      link: function($scope, element) {

        $scope.click = function() {
          $scope.value++;
          if ($scope.onAction) {
            $scope.onAction();
          }
        };
      }
    };
  }
})(window.angular);
