(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .controller('FoundItemsDirectiveController', FoundItemsDirectiveController)
        .service('MenuMatchService', MenuMatchService)
        .constant('MenuItemsUrl', 'https://davids-restaurant.herokuapp.com/menu_items.json')
        .directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuMatchService'];
    function NarrowItDownController(MenuMatchService) {
        var controller = this;

        controller.narrowMenuItems = function() {
            console.log('narrowMenuItems called, searchTerm is', controller.searchTerm);
            var promise = MenuMatchService.getMatchedMenuItems(controller.searchTerm);
            promise.then(function(foundItems) {
                controller.found = foundItems;
            })
            .catch(function(error) {
                console.error('Error getting filtered items!', error);
            });
        };

        controller.removeItem = function(itemIndex) {
            controller.found.splice(itemIndex, 1);
        }
    }

    function FoundItems() {
        var ddo = {
            templateUrl: 'foundItemsTemplate.html',
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: 'FoundItemsDirectiveController as foundItems',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var foundItems = this;
    }

    MenuMatchService.$inject = [ '$http', 'MenuItemsUrl' ];
    function MenuMatchService($http, MenuItemsUrl) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            console.log('getMatchedMenuItems called with term:', searchTerm);
            // Use $http to get the list of all menu items
            return $http({
                url: MenuItemsUrl,
                method: 'GET'
            }).then(function(response) {
                var menuItems = response.data.menu_items;
                var foundItems = [];

                if (searchTerm === undefined || searchTerm === "") {
                    return [];
                }

                var term = searchTerm.toLowerCase();
                // loop through to pick the ones whose description matches the searchTerm
                for (var i = 0; i < menuItems.length; i++) {
                    if (menuItems[i] !== undefined &&
                            menuItems[i].description.toLowerCase().match(term)) {
                        foundItems.push(menuItems[i]);
                    }
                }
                console.log('Reduced', menuItems.length, 'items to ', foundItems.length,
                    'items matching', searchTerm);
                // return found items in list (wrapped in a promise)
                return foundItems;
            });
        }
    }
})();