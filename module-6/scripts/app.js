(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunch = "";
        $scope.message = "";
        $scope.textClassName = "";
        $scope.inputClassName = "";

        $scope.checkLunch = function() {
            // The Mozilla Developer link to the split function included an example
            // where the array is split and leading/trailing spaces are already removed.
            // I used the regular expression below in my split function call.
            var splitLunch = $scope.lunch.split(/\s*,\s*/);
            // Also on the Mozilla Developer website is the Array.prototype.filter()
            // function, I used that to remove any empty elements.
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            splitLunch = splitLunch.filter(item => item.length > 0);

            console.log("Items In splitLunch:", splitLunch);

            if (splitLunch == 0) {
                $scope.message = "Please enter data first.";
                $scope.textClassName = "text-danger";
                $scope.inputClassName = "has-error";
            } else if (splitLunch.length > 3) {
                $scope.message = "Too Much!";
                $scope.textClassName = "text-success";
                $scope.inputClassName = "has-success";
            } else {
                $scope.message = "Enjoy!";
                $scope.textClassName = "text-success";
                $scope.inputClassName = "has-success";
            }
        };

    }
})();