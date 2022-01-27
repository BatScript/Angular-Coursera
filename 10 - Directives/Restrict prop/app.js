(function () {
    "use strict"
    angular.module("my-app", [])
        .controller("listOne", listOne)
        .controller("listTwo", listTwo)
        .service("listService", listService)
        .controller("warningController", warningController)
        .factory("listFactory", listFactory)
        .directive("listItem", ListItem);

    function ListItem() {
        var ddo = {
            templateUrl: 'repeater.html',
            scope : {
                items : "<",
                title : '@'
            },
            controller : 'warningController as list',
            // controllerAs : 'list',
            bindToController : true
        }
        return ddo;
    }

    function warningController() { 
        var list = this;

        list.warningFunction = function() { 
            for(var i = 0 ; list.items.length; i++) {
                var name = list.items[i];
                if(name.toLowerCase().indexOf("cookie") !== -1) {
                    return true;
                }
            }
            return false;
        }
    }

    listOne.$inject = ["listFactory"];
    function listOne(listFactory) {
        var l1 = this;
        var listFactory = listFactory();

        l1.items = listFactory.displayItem();
        l1.itemName = ""

        l1.onAddToList = function () {
            listFactory.addItem(l1.itemName);
            l1.itemName = ""
        }

        l1.deleteItem = function (id) {
            listFactory.deleteItem(id);
        }
    }

    listTwo.$inject = ["listFactory"];
    function listTwo(listFactory) {
        var l2 = this;
        var listFactory = listFactory();

        l2.items = listFactory.displayItem();
        l2.listItem = "";

        l2.onAddToList = function () {
            listFactory.addItem(l2.itemName);
            l2.itemName = ""
        }

        l2.deleteItem = function (id) {
            listFactory.deleteItem(id);
        }

    }

    function listService(maxItems) {
        var ls = this;
        var list = [];
        ls.addItem = function (itemName) {
            list.push(itemName);
        }

        ls.deleteItem = function (itemId) {
            list.splice(itemId, 1);
        }

        ls.displayItem = function () {
            return list;
        }
    }

    function listFactory() {
        var factory = function (maxItems) {
            return new listService(maxItems);
        }
        return factory;
    }
})();