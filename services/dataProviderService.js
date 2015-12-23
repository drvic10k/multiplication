services.service('dataProviderService', ['$http', function($http) {
  var self = this;

  self.postRecord = function(info) {
    $http.post('/rankings', info);
  };

  self.getRecords = function() {
    var promise = $http.get('/rankings').then(
      function(response) {
        return response.data;
      },
      function(response) {
        return [];
      }
    );

    return promise;
  };

  self.getRecord = function(recordInfo) {
    var promise = $http.get('/rankings').then(
      function(response) {
        var rankings = response.data;
        var same = rankings.filter(function(item) {
          return item.firstName === recordInfo.firstName &&
            item.lastName === recordInfo.lastName &&
            item.class === recordInfo.class;
        })[0];

        return same;
      },
      function(response) {
        return undefined;
      }
    );

    return promise;
  };
}]);
