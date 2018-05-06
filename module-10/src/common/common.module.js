(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://schouinard-ajaxcourse.herokuapp.com')
.constant('RestaurantServerUrl', 'https://schouinard-ajaxcourse.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
