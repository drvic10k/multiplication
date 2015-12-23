directives.directive('ngFocus', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.bind('keydown', function(e) {
        var $elem = $(elem);
        var code = e.keyCode || e.which;
        if (code === 13) {
          e.preventDefault();
          if (scope.$last) {
            $('#finish').focus();
          }
          $elem.closest('.row').next().find('input').focus();
        }
      });
      elem.bind('focus', function(e) {
        var $elem = $(elem);
        $elem.select();
      });
    }
  }
});
