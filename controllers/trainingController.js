controllers.controller('trainingController', ['$scope', '$cookies', '$http', 'dataProviderService', function($scope, $cookies, $http, dataProviderService) {
  $scope.priklady = [];
  $scope.amount = 10;
  $scope.errors = 0;
  $scope.validated = false;
  $scope.mode = 'multiply';
  $scope.allValid = false;
  $scope.timeInfo = {};
  $scope.personalInfo = {
    firstName: '',
    lastName: '',
    class: '',
    record: 0
  };
  var bestTime = undefined;

  var startTime = Date.now();

  $scope.submit = function() {
    $cookies.put('firstName', $scope.personalInfo.firstName);
    $cookies.put('lastName', $scope.personalInfo.lastName);
    $cookies.put('class', $scope.personalInfo.class);
    $scope.personalInfo.record = $cookies.get('bestTime');

    dataProviderService.postRecord($scope.personalInfo);
  };

  $scope.newProblems = function() {
    initialize();
  };

  $scope.finish = function() {
    var allValid = true;
    for (var i = 0; i < $scope.priklady.length; i++) {
      if (!validateResult($scope.priklady[i])) {
        $scope.errors++;
        allValid = false;
      }
    }
    if (allValid) {
      $scope.allValid = true;
      var finalTime = Date.now() - startTime;
      $scope.timeInfo = {
        finalTime: Date.now() - startTime,
        bestTime: bestTime,
        newBestTime: bestTime === undefined || finalTime < bestTime
      };
      $('#modal').modal('show');
      if ($scope.timeInfo.newBestTime)
        $cookies.put('bestTime', finalTime);
    }
  };

  $scope.focusFirst = function() {
    var firstInput = $(document).find('input[type="text"]').eq(0);

    firstInput.focus();
    firstInput.change(function() {
      startTime = Date.now();
    });
  };

  function validateResult(row) {
    $scope.validated = true;
    if (row.result != row.expectedResult) {
      row.invalid = true;
      row.valid = false;
      return false;
    } else {
      row.invalid = false;
      row.valid = true;
      return true;
    }
  };

  function initialize() {
    $scope.priklady.length = 0;
    $scope.errors = 0;
    $scope.validated = false;
    startTime = Date.now();
    $scope.allValid = false;
    bestTime = $cookies.get('bestTime');
    $scope.personalInfo.firstName = $cookies.get('firstName');
    $scope.personalInfo.lastName = $cookies.get('lastName');
    $scope.personalInfo.class = $cookies.get('class');

    for (var i = 0; i < $scope.amount; i++) {
      $scope.priklady.push(generatePriklad());
    }
  };
  initialize();

  function generatePriklad() {
    var x = Math.floor((Math.random() * 10) + 1);
    var y = Math.floor((Math.random() * 10) + 1);

    if ($scope.mode === 'multiply') {
      return {
        text: x.toString() + ' x ' + y.toString() + ' =',
        expectedResult: x * y,
        result: ''
      };
    }
    return {
      text: (x * y).toString() + ' : ' + x.toString() + ' =',
      expectedResult: y,
      result: ''
    };
  };
}]);
