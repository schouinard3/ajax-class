(function() {
    'use strict';

    angular.module('MenuApp')
        .component('categoryList', {
            templateUrl: 'templates/categorylist.component.template.html',
            bindings: {
                categories: '<'
            }
        });
})();
