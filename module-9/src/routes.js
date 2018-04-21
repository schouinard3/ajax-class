(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RouteConfig($stateProvider, $urlRouterProvider) {
        // Default page:
        $urlRouterProvider.otherwise('/')

        // UI State: Home Page
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'templates/home.template.html'
        });
        // UI State: Categories
        $stateProvider.state('categories', {
            url: '/categories',
            templateUrl: 'templates/categories.template.html',
            controller: 'MenuCategoriesController as menuCategories',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        });
        // UI State: Items
        $stateProvider.state('categories.items', {
            url: '/{categoryId}/items',
            templateUrl: 'templates/items.template.html',
            controller: 'MenuItemsController as menuItems',
            resolve: {
                items: ['$stateParams', 'MenuDataService', 'categories',
                    function($stateParams, MenuDataService, categories) {
                        var category = categories[$stateParams.categoryId];
                        return MenuDataService.getItemsForCategory(category.short_name);
                    }
                ]
            }
        });
    }
})();
