(function(angular) {
  'use strict';

  angular
    .module('angularApp')
    .controller('HomeController', homeController);

	homeController.$inject = ['$scope', 'simpleService'];

	function homeController($scope, simpleService) {

    simpleService
    .getPosts()
    .then(function(posts) {
      console.log(posts);
      $scope.posts = posts;
    });

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
