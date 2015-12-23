controllers.controller('navigationController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
  $scope.activeTab = '';

  $rootScope.$on('$locationChangeSuccess', function(oldValue, newValue) {
    $scope.activeTab = $location.path().replace(/\//g,'');
  });
}]);
