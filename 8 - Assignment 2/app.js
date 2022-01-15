(function () {
  "use strict";
  angular
    .module("my-app", [])
    .controller("mainController", mainController)
    .service("shoppingService", shoppingService);
  mainController.$inject = ["shoppingService"];
  function mainController(shoppingService) {
    var main = this;
    main.itemList = [
      {
        name: "potatoes",
        qty: 5,
      },
      {
        name: "chips",
        qty: 5,
      },
      {
        name: "Onions",
        qty: 3,
      },
      {
        name: "Cookies",
        qty: 100,
      },
      {
        name: "Bhindi",
        qty: 1,
      },
    ];
    main.addToCart = function (index) {
      var obj = main.itemList[index];
      var addObj = {
        name: obj.name,
        qty: obj.qty,
      };
      shoppingService.addItem(addObj);
    };
    main.deleteFromCart = function (index) {
      shoppingService.deleteItems(index);
    };
    main.deletedItems = shoppingService.displayDeleted();
    main.items = shoppingService.displayItems();
    main.message = function () {
      if (main.items.length === 0) {
        return true;
      } else {
        return false;
      }
    };
    console.log(main.message());
  }
  function shoppingService() {
    var service = this;

    const cartItems = [];
    const ordered = [];

    service.addItem = function (item) {
      cartItems.push(item);
    };

    service.deleteItems = function (itemId) {
      var obj = cartItems[itemId];
      ordered.push(obj);
      cartItems.splice(itemId, 1);
    };

    service.displayItems = function () {
      return cartItems;
    };

    service.displayDeleted = function () {
      return ordered;
    };
  }
})();
