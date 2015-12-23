var myApp = angular.module('myApp', ['ngCookies', 'ngRoute', 'controllers', 'directives', 'services']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/training/', {
      templateUrl: 'training.html',
    })
    .when('/rankings/', {
      templateUrl: 'rankings.html',
      controller: 'rankingsController',
      controllerAs: 'ctrl'
    });
}]);
