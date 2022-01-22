(function () {
  "use strict";
  angular
    .module("my-app", [])
    .controller("conOne", conOne)
    .controller("conTwo", conTwo)
    .service("iceAndFire", iceAndFire)
    .directive("listItems", ListItems)
    .directive("wholeList", WholeList)
    .directive("conTwoList", ConTwoList);

  function WholeList() {
    var ddo = {
      templateUrl: "characterList.html",
    };
    return ddo;
  }
  function ListItems() {
    var ddo = {
      template: "<b>{{items.name}}</b> : {{items.occupation}} ",
    };
    return ddo;
  }

  function ConTwoList() {
    var ddo = {
      templateUrl: "newList.html",
    };
    return ddo;
  }

  function conTwo() {
    var c2 = this;
    c2.list = ["Mohit", "Potato", "Egypt", "Whale", "Aquaman"];
    c2.delete = function (id) {
      c2.list.splice(id, 1);
    };
  }

  conOne.$inject = ["$q", "iceAndFire"];
  function conOne($q, iceAndFire) {
    var con = this;
    con.apiData = "";
    var deferred = $q.defer();
    var promise = iceAndFire.fetchApi();
    promise.then(function (response) {
      con.apiData = response.data;
    });
    con.deadPeople = function (id) {
      document.getElementById(id).style.textDecoration = "line-through";
    };
  }

  iceAndFire.$inject = ["$http"];
  function iceAndFire($http) {
    var GOT = this;
    GOT.fetchApi = function () {
      var response = $http({
        method: "GET",
        url: "https://breakingbadapi.com/api/characters",
      });

      return response;
    };
  }
})();
