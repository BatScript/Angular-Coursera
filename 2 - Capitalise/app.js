(function () {
  "use strict";
  angular
    .module("first-app", [])
    .controller("first-controller", firstController);
  firstController.$inject = ["$scope", "$filter"];
  function firstController($scope, $filter) {
    $scope.name = "Hello";
    $scope.upper = function () {
      var upCase = $filter("uppercase");
      $scope.name = upCase($scope.name);
    };
  }
})();
