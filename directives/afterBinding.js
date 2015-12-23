directives.directive('afterBinding', function(){
  return function(scope, element, attrs) {
      if (scope.$last) {
        scope.focusFirst();
      }
    };
})
