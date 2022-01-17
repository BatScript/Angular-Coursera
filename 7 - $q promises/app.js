(function () {
  "use strict";
  angular
    .module("my-app", [])
    .controller("firstController", firstController)
    .service("checkAddiction", checkAddiction)
    .service("addItem", addItem);
  firstController.$inject = ["addItem"];
  function firstController(addItem) {
    var first = this;
    first.date = new Date().toLocaleDateString("en-US");
    first.gameName = "";
    first.gameHours = "";
    first.message = "";
    first.check = function () {
      addItem.addToList(first.gameName, first.gameHours);
      first.list = addItem.displayList();
    };
  }

  addItem.$inject = ["$q", "checkAddiction"];
  function addItem($q, checkAddiction) {
    var add = this;
    const items = [];

    add.addToList = function (name, hours) {
      var p = checkAddiction.check(name);
      var q = checkAddiction.checkHours(hours);

      $q.all([p, q])
        .then(function (response) {
          var obj = {
            name: name,
            time: hours,
          };
          items.push(obj);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      add.displayList = function () {
        return items;
      };
    };
  }

  checkAddiction.$inject = ["$q", "$timeout"];
  function checkAddiction($q, $timeout) {
    var service = this;
    service.check = function (name) {
      var deferred = $q.defer();

      $timeout(function () {
        if (name.toLowerCase().indexOf("valorant") === -1) {
          deferred.resolve("");
        } else {
          deferred.reject(
            "welp! stop playing Valorant you are bronze since an year"
          );
        }
      }, 1000);
      return deferred.promise;
    };

    service.checkHours = function (hours) {
      var deferred = $q.defer();

      $timeout(function () {
        if (hours > 4) {
          deferred.reject("Addicted");
        } else {
          deferred.resolve("");
        }
      }, 3000);

      return deferred.promise;
    };
  }
})();
