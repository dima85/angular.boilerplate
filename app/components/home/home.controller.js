(function(angular) {
  'use strict';

  angular
    .module('angularApp')
    .controller('HomeController', homeController);

	homeController.$inject = ['$scope'];

	function homeController($scope) {
		$scope.test = 'test...';
    $scope.sayHelloFromDirective = function() {
      console.log('action');
    };
    $scope.getNumbers = function() {
      var i;
      var result = [];
      for (i = 1; i <= parseInt($scope.number); i++) {
        result.push(i);
      }
      return result;
    };
	}
})(window.angular);
