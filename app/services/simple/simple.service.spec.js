describe('Simple service tests', function () {
  'use strict';

  var service;
  var $httpBackend;

  beforeEach(module('angularApp'));
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');

    service = $injector.get('simpleService');
  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  describe('When call "getPosts"', function () {
    var posts;
    beforeEach(function () {
      $httpBackend.when('GET', 'http://jsonplaceholder.typicode.com/posts').respond([{id: 1}, {id: 2}]);

      service.getPosts()
      .then(function(postsResponse) {
        posts = postsResponse;
      });

      $httpBackend.expectGET('http://jsonplaceholder.typicode.com/posts');
      $httpBackend.flush();
    });
    it('Should return list of posts', function () {
      expect(posts.length).toBe(2);
    });
  });

});
