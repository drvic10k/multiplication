controllers.controller('rankingsController', ['dataProviderService', function(data) {
  var scope = this;

  data.getRecords().then(function(records) {
    scope.records = records;
  });
}]);
