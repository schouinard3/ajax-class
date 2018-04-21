(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('MenuItemsController', MenuItemsController);


    MenuItemsController.$inject = ['$stateParams', 'MenuDataService', 'items', 'categories'];
    function MenuItemsController($stateParams, MenuDataService, items, categories) {
        var itemsCtrl = this;
        itemsCtrl.category = categories[$stateParams.categoryId];
        itemsCtrl.items = items;
    }

})();
