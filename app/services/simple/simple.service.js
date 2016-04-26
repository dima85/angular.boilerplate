(function(angular) {
  'use strict';

  angular
  .module('angularApp')
  .factory('simpleService', SimpleService);

  SimpleService.$inject = ['$http'];

  function SimpleService($http) {

    function getPosts() {
      return $http({
        method: 'GET',
        url: 'http://jsonplaceholder.typicode.com/posts'
      })
      .then(function(postsResponse) {
        return postsResponse.data;
      })
      .catch(function(error) {
        console.log('Error during fetch of posts: ' + error);
        return error;
      });
    }

    return {
      getPosts: getPosts
    };
  }
})(window.angular);
