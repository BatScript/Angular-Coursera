(function () {
  "use strict";
  angular
    .module("my-app", [])
    .controller("shoppingListController1", shoppingListController1)
    // .controller("shoppingListController2", shoppingListController2)
    .provider("shoppingListService", shoppingListServiceProvider)
    .config(Config);
  // .factory("shoppingListFactory", shoppingListFactory);
  // .service("shoppingListService", shoppingListService); //custom service

  //list 1 controller
  Config.$inject = ["shoppingListServiceProvider"];
  function Config(shoppingListServiceProvider) {
    shoppingListServiceProvider.defaults.maxItems = 5;
  }
  shoppingListController1.$inject = ["shoppingListService"];
  function shoppingListController1(shoppingListService) {
    var list1 = this; //label
    // var shoppingList = shoppingListFactory(); //this has undefined parameter which means it has no limit
    list1.itemName = "";
    list1.itemQty = "";
    list1.items = shoppingListService.displayItem();
    list1.addItem = function () {
      try {
        shoppingListService.addItem(list1.itemName, list1.itemQty);
      } catch (err) {
        list1.errmsg = err.message;
      }
    };
    list1.deleteItem = function (index) {
      shoppingListService.deleteItem(index);
    };
  }

  //list 2 controller
  //   shoppingListController2.$inject = ["shoppingListService"];
  //   function shoppingListController2(shoppingListService) {
  //     var list2 = this;
  //     // var shoppingList = shoppingListFactory(3);
  //     list2.items = shoppingListService.displayItem();
  //     list2.itemName = "";
  //     list2.itemQty = "";
  //     list2.addItem = function () {
  //       try {
  //         shoppingListService.addItem(list2.itemName, list2.itemQty);
  //       } catch (err) {
  //         list2.errmsg = err.message;
  //       }
  //     };
  //     list2.deleteItem = function (index) {
  //       shoppingList.deleteItem(index);
  //     };
  //   }

  function shoppingListService(maxItem) {
    var service = this; //label
    var items = []; //the cart Items

    service.addItem = function (itemName, quantity) {
      if (
        maxItem === undefined ||
        (maxItem !== undefined && items.length < maxItem)
      ) {
        var item = {
          name: itemName,
          qty: quantity,
        };

        items.push(item);
      } else {
        throw new Error("Max Items " + maxItem + " reached.");
      }
    };

    service.deleteItem = function (id) {
      items.splice(id, 1);
    };

    service.displayItem = function () {
      return items;
    };
  }

  function shoppingListServiceProvider() {
    var provider = this;

    provider.defaults = {
      maxItems: 2,
    };

    provider.$get = function () {
      var shoppingList = new shoppingListService(provider.defaults.maxItems);
      return shoppingList;
    };
  }

  // function shoppingListFactory() {
  //   var factory = function (maxItems) {
  //     return new shoppingListService(maxItems);
  //   };

  //   return factory;
  // }
})();
