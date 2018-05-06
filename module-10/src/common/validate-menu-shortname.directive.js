(function() {
    "use strict";

    angular.module('common')
        .directive('validateMenuShortname', ValidateMenuShortname);

    // Used https://code.angularjs.org/1.5.8/docs/guide/forms -> Custom Validation
    // to create the directive that validates the menu item asynchronously
    ValidateMenuShortname.$inject = ['$http', 'RestaurantServerUrl'];
    function ValidateMenuShortname($http, RestaurantServerUrl) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$asyncValidators.validateMenuShortname = function(modelValue, viewValue) {
                    return $http({
                        url: RestaurantServerUrl+"/menu_items/"+modelValue+".json",
                        method: 'GET'
                    }).then(function(response) {
                        return response.data;
                    });
                };
            }
        };
    }
})();
