(function() {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('MenuCategoriesUrl', 'https://davids-restaurant.herokuapp.com/categories.json')
        .constant('MenuItemsUrl', 'https://davids-restaurant.herokuapp.com/menu_items.json');

    MenuDataService.$inject = [ '$http', 'MenuCategoriesUrl', 'MenuItemsUrl'];
    function MenuDataService($http, MenuCategoriesUrl, MenuItemsUrl) {
        var service = this;

        service.getAllCategories = function() {
            return $http({
                url: MenuCategoriesUrl,
                method: 'GET'
            }).then(function(response) {
                return response.data;
            });
        };

        service.getItemsForCategory = function(categoryShortName) {
            return $http({
                url: MenuItemsUrl,
                method: 'GET',
                params: {
                    category: categoryShortName
                }
            }).then(function(response) {
                return response.data.menu_items;
            });
        };
    }

})();
