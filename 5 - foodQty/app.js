(function () {
  "use strict";
  angular
    .module("first-app", [])
    .controller("first-controller", firstController);
  firstController.$inject = ["$scope"];
  function firstController($scope) {
    $scope.message = "";
    $scope.name = "";

    $scope.checkOverEat = function () {
      var arr = $scope.name.split(",");
      var len = arr.length;
      if (len > 1 && len < 4) {
        $scope.message = "Cool";
      } else if (len >= 4) {
        $scope.message = "you need to eat less";
      } else {
        $scope.message = "try eating food?";
      }
    };
  }
})();
