(function() {

  var app = angular.module('reddit', ['ionic', 'angularMoment'])

  app.controller('MainCtrl', function($http, $scope) {
    //KEEO OUR 'STORIES' ARRAY EMPTY AND POPULATE IT WITH OUR API DATA
    $scope.stories = [];
    //WE ARE PASSING AN EXTRA PARAMETER TO THE $HTTP THAT WILL BE THE NAME OF THE LAST STORY GOTTEN
    //SECOND PARAMTER ADDED TO HTTP 'PARAMS: PARAMS'- configuration object
    //IF STORIES ARRAY HAS SOME DATA, SET THE "AFTER" PARAMATER FROM REDDIT API TO BE THE 'NAME' OF THE LAST STORY
    //SCOPE.STORIES ARRAY INDEX IS SET TO SCOPE.STORIES.LENGTH MINUS 1 AND THEN ADD THE 'NAME'
    $scope.loadMore = function(){
      var params = {};
      if ($scope.stories.length > 0) {
        params['after'] = $scope.stories[$scope.stories.length - 1].name;
      }
      $http.get('https://www.reddit.com/r/webdev.json', {params: params})
        .success(function(response){
          //ITERATE OVER EACH OBJECT IN THE ARRAY RESPONSE AND PUSH IT INTO OUR EMPTY STORIES ARRAY
          angular.forEach(response.data.children, function(child){
            //ADD THE DEFAULT IMAGE WHEN NOT PROVIDED BY API
            var story = child.data;
            if (story.thumbnail === 'self' || story.thumbnail === 'default') {
              story.thumbnail = 'http://www.redditstatic.com/icon.png';
            }
            $scope.stories.push(child.data);
          });
          //WHEN RESPONSE COMPLETE, IONIC WILL BROADCAST EVENT TO KNOW FETCHING STORIES IS DONE
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
  });

}());

