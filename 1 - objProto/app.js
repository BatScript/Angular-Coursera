// object prototyping
(function () {
  "use strict";
  angular
    .module("first-app", [])
    .controller("parent-controller", parentController)
    .controller("child-controller", childController);

  parentController.$inject = ["$scope"];
  function parentController($scope) {
    var parent = this;
    parent.value = 1;
    console.log($scope);
  }

  childController.$inject = ["$scope"];
  function childController($scope) {
    var child = this;
    child.value = 59;
    console.log($scope);
  }
})();
