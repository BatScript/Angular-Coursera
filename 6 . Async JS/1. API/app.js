(function () {
  "use strict";
  angular.module("app", []).controller("animeList", animeListController);
  animeListController.$inject = ["$scope"];
  function animeListController($scope) {
    $scope.data = "";
    const request = new XMLHttpRequest();
    request.open("GET", "https://ghibliapi.herokuapp.com/films/");
    request.send();
    request.addEventListener("load", function () {
      const data = JSON.parse(this.responseText);
      console.log("loaded");
      $scope.showVal = function () {
        $scope.data = data;
        // const imgArray = [];
        // const nameArray = [];
        // dat.forEach((element) => {
        //   imgArray.push(element.image);
        // });
      };
    });
  }
})();
