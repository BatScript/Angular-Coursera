(function () {
  "use strict";
  angular
    .module("my-app", [])
    .controller("shoppingListController", shoppingListController)
    .factory("shoppingListFactory", ShoppingListFactory)
    .directive("shoppingList", ShoppingListDirective);

  function ShoppingListDirective() {
    var ddo = {
      templateUrl: "shoppingList.html",
      scope: {
        items: "<",
        myTitle: "@title",
        badRemove: "=",
        onRemove: "&",
      },
      controller: ShoppingListDirectiveController,
      controllerAs: "list",
      bindToController: true,
      link: shoppingListLink,
    };
    return ddo;
  }

  function shoppingListLink(scope, element, attrs, controller) {
    scope.$watch("list.valoInList()", function (newVal, oldVal) {
      if (newVal) {
        displayWarning();
      } else {
        removeDisplayWarning();
      }
    });

    function displayWarning() {
      var warningElem = element.find("div.error");
      warningElem.slideDown(500);
    }
    function removeDisplayWarning() {
      var warningElem = element.find("div.error");
      warningElem.slideUp(500)
    }
  }

  function ShoppingListDirectiveController() {
    var list = this;

    list.valoInList = function () {
      console.log(list);
      for (var i = 0; i < list.items.length; i++) {
        var name = list.items[i].name;
        if (name.toLowerCase().indexOf("valorant") !== -1) {
          return true;
        }
      }

      return false;
    };
  }

  shoppingListController.$inject = ["shoppingListFactory"];
  function shoppingListController(shoppingListFactory) {
    var list = this;
    var shoppingList = shoppingListFactory();
    list.items = shoppingList.getItems();
    var origTitle = "Shopping List #1";
    list.title = origTitle + " (" + list.items.length + " items )";

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function () {
      shoppingList.addItem(list.itemName, list.itemQuantity);
      list.title = origTitle + " (" + list.items.length + " items )";
    };

    list.removeItem = function (itemIndex) {
      console.log("'this' is: ", this);
      this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
      shoppingList.removeItem(itemIndex);
      this.title = origTitle + " (" + list.items.length + " items )";
    };
  }

  function ShoppingListService(maxItems) {
    var service = this;

    // List of shopping items
    var items = [];

    service.addItem = function (itemName, quantity) {
      if (
        maxItems === undefined ||
        (maxItems !== undefined && items.length < maxItems)
      ) {
        var item = {
          name: itemName,
          quantity: quantity,
        };
        items.push(item);
      } else {
        throw new Error("Max items (" + maxItems + ") reached.");
      }
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };

    service.getItems = function () {
      return items;
    };
  }

  function ShoppingListFactory() {
    var factory = function (maxItems) {
      return new ShoppingListService(maxItems);
    };

    return factory;
  }
})();
