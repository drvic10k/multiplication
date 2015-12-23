directives.directive('ngSuccess', function() {
  return {
    scope: {
      timeInfo: '=time',
      personalInfo: '=person',
      submit: "&"
    },
    templateUrl: 'success.html'
  };
});
