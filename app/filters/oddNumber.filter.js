(function(angular) {
  'use strict';

  angular
  .module('angularApp')
  .filter('oddNumber', oddNumberFilter);

  function oddNumberFilter() {
    return function(items) {
      return items.filter(function(item) {
        return item % 2 == 0;
      });
    };
  }
})(window.angular);
