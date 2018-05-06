(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.signup', {
        url: '/signup',
        templateUrl: 'src/public/signup.html',
        controller: 'SignupController',
        controllerAs: 'signupCtrl',
        resolve: {}
    })
    .state('public.myinfo', {
        url: '/myinfo',
        templateUrl: 'src/public/userinfo.html',
        controller: 'UserInfoController',
        controllerAs: 'userInfoCtrl',
        resolve: {
            userInfo: ['UserInfoService', function(UserInfoService) {
                return UserInfoService.getUserInfo();
            }],
            menuItem: ['$http', 'RestaurantServerUrl', 'UserInfoService', function($http, RestaurantServerUrl, UserInfoService) {
                var userInfo = UserInfoService.getUserInfo();
                if (!userInfo || !userInfo.dish) {
                    return undefined;
                }

                var dish = userInfo.dish;
                return $http({
                    url: RestaurantServerUrl+"/menu_items/"+dish+".json",
                    method: 'GET'
                }).then(function(response) {
                    return response.data;
                });
            }]
        }
    });
}
})();
