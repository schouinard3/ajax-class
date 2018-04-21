(function() {
    'use strict';

    angular.module('MenuApp')
        .component('menuItems', {
            templateUrl: 'templates/menuitems.component.template.html',
            bindings: {
                items: '<'
            }
        });
})();
