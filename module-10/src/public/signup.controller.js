(function() {
    "use strict";

    angular.module('public')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['UserInfoService'];
    function SignupController(UserInfoService) {
        var $ctrl = this;
        $ctrl.submitted = false; // default to false

        $ctrl.submit = function() {
            UserInfoService.setUserInfo($ctrl.user);
            $ctrl.submitted = true;
        }
    }
})();
