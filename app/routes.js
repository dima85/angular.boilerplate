(function(angular) {
  'use strict';

  angular
    .module('angularApp')
    .config(['$routeProvider', routes]);

  function routes($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: './components/home/home.tpl.html',
        controller: 'HomeController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})(window.angular);
