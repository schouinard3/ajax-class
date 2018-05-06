(function() {
    "use strict";

    angular.module('public')
        .controller('UserInfoController', UserInfoController);

    UserInfoController.$inject = ['userInfo', 'menuItem'];
    function UserInfoController(userInfo, menuItem) {
        var $ctrl = this;

        $ctrl.userInfo = userInfo;
        $ctrl.menuItem = menuItem;
    }
})();
