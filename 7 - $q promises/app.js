(function () {
  "use strict";
  angular
    .module("my-app", [])
    .controller("firstController", firstController)
    .service("checkAddictionName", checkAddictionName);
  firstController.$inject = ["checkAddictionName"];
  function firstController(checkAddictionName) {
    var first = this;
    first.gameName = "";
    first.gameHours = "";
    first.message = "";
    first.message2 = "";
    first.check = function () {
      var p = checkAddictionName.checkName(first.gameName);
      var q = checkAddictionName.checkHours(first.gameHours);

      p.then(
        function (response) {
          first.message = response;
        },
        function (error) {
          first.message = error;
        }
      );

      q.then(
        function (response) {
          first.message2 = response;
        },
        function (error) {
          first.message2 = error;
        }
      );
    };
  }

  checkAddictionName.$inject = ["$q", "$timeout"];
  function checkAddictionName($q, $timeout) {
    var service = this;
    service.checkName = function (name) {
      var deferred = $q.defer();

      $timeout(function () {
        if (name.toLowerCase().indexOf("valorant") === -1) {
          deferred.resolve("fair enough");
        } else {
          deferred.reject(
            "welp! stop playing Valorant you are bronze since an year"
          );
        }
      }, 2000);
      return deferred.promise;
    };

    service.checkHours = function (hours) {
      var deferred = $q.defer();

      $timeout(function () {
        if (hours > 4) {
          deferred.reject("Addicted");
        } else {
          deferred.resolve("Not Addicted");
        }
      }, 5000);

      return deferred.promise;
    };
  }
})();
