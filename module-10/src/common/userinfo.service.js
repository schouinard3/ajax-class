(function() {
    "use strict";

    angular.module('common')
        .service('UserInfoService', UserInfoService);

    UserInfoService.$inject = [];
    function UserInfoService() {
        var service = this;

        service.userInfo = undefined;

        service.setUserInfo = function(infoObj) {
            if (infoObj) {
                console.log('Setting User Info:', infoObj);
                service.userInfo = infoObj;
            }
        }

        service.getUserInfo = function() {
            return service.userInfo;
        }
    }
})();
