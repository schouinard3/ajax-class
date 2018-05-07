describe('validate-menu-shortname validation directive', function() {

    var $httpBackend;
    var RestaurantServerUrl;

    var $compile;
    var $rootScope;
    var formHtml;

    beforeEach(module('restaurant'));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        RestaurantServerUrl = $injector.get('RestaurantServerUrl');
    }));

    beforeEach(inject(function($templateCache) {
        var publicTemplate = null;
        var publicTemplateRequest = new XMLHttpRequest();
        publicTemplateRequest.onload = function() {
            publicTemplate = this.responseText;
        };
        publicTemplateRequest.open("get", "src/public/public.html", false);
        $templateCache.put("src/public/public.html", publicTemplate);

        var homeTemplate = null;
        var homeTemplateRequest = new XMLHttpRequest();
        homeTemplateRequest.onload = function() {
            homeTemplate = this.responseText;
        };
        homeTemplateRequest.open("get", "src/public/home/home.html", false);
        $templateCache.put("src/public/home/home.html", homeTemplate);
    }));

    beforeEach(inject(function(_$rootScope_, _$compile_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        formHtml = angular.element("<form name='testform'> \
            <input type='text' \
                name='dish' \
                ng-model='testmodel.dish' \
                validate-menu-shortname /> \
        </form>");
    }));

    var successfulObj = {
        "id": 100,
        "short_name": "YES",
        "name": "Successful Menu Item Call",
        "description":"successfully called for the user's favorite menu item that exists",
        "price_small": 1.00,
        "price_large": 2.00,
        "small_portion_name": "call",
        "large_portion_name": "call",
        "created_at": "2018-05-06T13:04:28.710Z",
        "updated_at": "2018-05-06T13:04:28.710Z",
        "category_short_name": "Y",
        "image_present": false
    };

    it('should validate true for valid dishes', function() {
        $httpBackend.whenGET(RestaurantServerUrl+'/menu_items/YES.json').respond(200, successfulObj);
        $rootScope.testmodel = { dish: 'YES' };
        $compile(formHtml)($rootScope);

        var form = $rootScope.testform;
        $rootScope.$digest();
        $httpBackend.flush();

        expect($rootScope.testmodel.dish).toEqual(successfulObj.short_name);
        expect($rootScope.testform.dish.$valid).toBe(true);
    });

    it('should validate false for invalid dishes', function() {
        $httpBackend.whenGET(RestaurantServerUrl+'/menu_items/NO.json').respond(404, undefined);
        $rootScope.testmodel = { dish: 'NO' };
        $compile(formHtml)($rootScope);

        var form = $rootScope.testform;
        $rootScope.$digest();
        $httpBackend.flush();

        expect($rootScope.testmodel.dish).toEqual('NO');
        expect($rootScope.testform.dish.$valid).toBe(false);
    });

    it('should validate false for server error response codes', function() {
        $httpBackend.whenGET(RestaurantServerUrl+'/menu_items/error.json').respond(500, undefined);
        $rootScope.testmodel = { dish: 'error' };
        $compile(formHtml)($rootScope);

        var form = $rootScope.testform;
        $rootScope.$digest();
        $httpBackend.flush();

        expect($rootScope.testmodel.dish).toEqual('error');
        expect($rootScope.testform.dish.$valid).toBe(false);
    });
});
