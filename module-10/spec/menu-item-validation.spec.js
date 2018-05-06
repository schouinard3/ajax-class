describe('validate-menu-shortname validation directive', function() {

    var validationDirective;
    var $httpBackend;
    var RestaurantServerUrl;
    var $compile;
    var $rootScope;
    var formTemplate;

    beforeEach(function() {
        module('restaurant');
        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            RestaurantServerUrl = $injector.get('RestaurantServerUrl');
        });
        inject(function(_$rootScope_, _$compile_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
        });
    });

    beforeEach(inject(function($templateCache) {

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

    xit('should return dish information', function() {
        var controllerObj = {
            signupCtrl: {
                user: {
                    firstName: 'first',
                    lastName: 'last',
                    email: 'first@last',
                    phone: '555-555-5555',
                    dish: 'YES'
                }
            }
        };
        $httpBackend.whenGET(RestaurantServerUrl+'/menu_items/YES.json').respond(successfulObj);
        $httpBackend.flush();
    });
});
