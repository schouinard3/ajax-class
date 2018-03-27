(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .filter('TripleDollar', TripleDollarFilter)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = [
        '$scope',
        'ShoppingListCheckOffService'
    ];
    function ToBuyController($scope, ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getItemsToBuy();
        toBuy.purchaseItem = function(itemIndex) {
            ShoppingListCheckOffService.purchaseItem(itemIndex);
        }
    }

    AlreadyBoughtController.$inject = [
        '$scope',
        'ShoppingListCheckOffService',
        'TripleDollarFilter'
    ];
    function AlreadyBoughtController($scope, ShoppingListCheckOffService, TripleDollarFilter) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.getItemsPurchased();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var itemsToBuy = [
            {
                name: "cookies",
                quantity: 10,
                pricePerItem: 1.05
            },
            {
                name: "cupcakes",
                quantity: 12,
                pricePerItem: 2.51
            },
            {
                name: "milk cartons",
                quantity: 4,
                pricePerItem: 2.00
            },
            {
                name: "bananas",
                quantity: 5,
                pricePerItem: 4.10 // expensive bananas.
            },
            {
                name: "peanut butter jars",
                quantity: 3,
                pricePerItem: 2.37
            }
        ];
        var itemsPurchased = [];

        service.getItemsToBuy = function() {
            return itemsToBuy;
        }

        service.getItemsPurchased = function() {
            return itemsPurchased;
        }

        service.purchaseItem = function(itemIndex) {
            if (itemIndex > itemsToBuy.length-1) {
                throw new Error("Could not purchase item "+itemIndex+" - no item exists!");
            }
            var itemPurchased = itemsToBuy.splice(itemIndex, 1)[0];
            itemsPurchased.push(itemPurchased);

        }
    }

    function TripleDollarFilter() {
        // This could be replaced by using the currency filter with a symbol parameter!
        return function(input) {
            input = input || 0.0;
            // Looked at the Number reference to find how to limit the number of
            // decimal places when converting to a string at:
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
            input = Number.parseFloat(input).toFixed(2);
            return "$$$"+input;
        }
    }
})();