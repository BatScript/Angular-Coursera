(function () {
  angular
    .module("first-app", [])
    .controller("first-controller", firstController)
    .filter("change", changeFilter);
  firstController.$inject = ["$scope", "changeFilter"];
  function firstController($scope, changeFilter) {
    var sen = "hi I am very sad";
    $scope.message = sen;
    $scope.changeMood = function () {
      var arr = sen.split(" ");
      var before = arr[arr.length - 1];
      var after = $scope.name;
      $scope.message = changeFilter(sen, before, after);
    };
    $scope.theMessage = function () {
      var sen = "Hi my name is mohit ranjan";
      sen = changeFilter(sen);
      return sen;
    };
  }
  function changeFilter() {
    return function (input, before, after) {
      input = input || "";
      input = input.replace(before, after);
      return input;
    };
  }
})();
